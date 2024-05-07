
const queryschema = require('../../../model/query')
var validator = require("email-validator");
const sendMail = require('../../../helper/email');
const statuscode = require('../../../helper/statuscode')
const response = require('../../../helper/response')
const {logger} = require("../../utils/logger.js");


const seeList = async (req, res) => {
    try {
        const details = await queryschema.find({name: req.body.name}, {
            title: 1, status: 1, confirm: 1
        });
        response(res, statuscode.success_code, "list", details)
    } catch (error) {
        logger.log("error in user seelist");
        response(res, statuscode.internal_server_error, error.message,)
    }
}

const raiseQuery = async (req, res) => {
    try {
        var result = validator.validate(req.body.email);
        if (!result) {
            res.status(401).send({success: false, error: "Please enter valid email"});
        }
        const query = await queryschema.create(req.body);
        // mail to user
        let mailSubject = 'Ticket raised!';
        let content = `<p>You have successfully raised ticket following are the details:TITLE:${req.body.title},DETAILS:${req.body.details}</p>`;
        sendMail(req.body.email, mailSubject, content);

        // mail to support
        let mailSubject2 = 'customer has raised a ticket!';
        let content2 = `<p>customer has raised a ticket with following details:TITLE:${req.body.title},DETAILS:${req.body.details}</p>`;
        sendMail(process.env.SMTP, mailSubject2, content2);//we can change email
        response(res, statuscode.success_code, "Ticket raised successfully",)
    } catch (error) {
        logger.log("error in raisequery");
        response(res, statuscode.internal_server_error, error.message,)
    }
}

const terminate = async (req, res) => {
    try {
        const {id: queryid} = req.params;
        if (req.body.confirm) {

            const created = await queryschema.findById(queryid);
            const currentTime = new Date();
            const differenceInMs = currentTime - created.createdAt;
            const differenceInHr = differenceInMs / (1000 * 60 * 60);

            req.body.hourtosolve = differenceInHr.toFixed(2);

            const details = await queryschema.findByIdAndUpdate(queryid, req.body, {new: true, runValidators: true})
            response(res, statuscode.success_code, "Status updated successfully",)
        }
    } catch (error) {
        logger.log("error in terminate");
        response(res, statuscode.internal_server_error, error.message,)
    }
}


module.exports = {
    seeList, raiseQuery, terminate
}
