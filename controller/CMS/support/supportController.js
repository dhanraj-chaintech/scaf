const queryschema = require('../../../model/query')
const replys = require('../../../model/reply')
const statuscode = require('../../../helper/statuscode')
const response = require('../../../helper/response')

const changestatus = async (req, res) => {
    try {
        req.body.support = req.body.name;
        req.body.name = req.original;
        const {id: queryid} = req.params;
        const result = await queryschema.findByIdAndUpdate(queryid, req.body, {new: true, runValidators: true})

        // let mailSubject = 'work in progress!!';
        // let content =
        //     `<p>we started solving ur issue, soon u will get reply,Query details.TITLE:${req.body.title},DETAILS:${req.body.details}
        // </p>`;
        // sendMail(req.body.email, mailSubject, content);

        response(res, statuscode.success_code, "status changed successfully",)
    } catch (error) {
        logger.log("error in changestatus");
        response(res, statuscode.internal_server_error, err.message,)
    }
}

const list = async (req, res) => {
    try {
        const result = await queryschema.find({confirm: null, support: null});
        response(res, statuscode.success_code, "queries list..", result)
    } catch (error) {
        logger.log("error in supportlist");
        response(res, statuscode.internal_server_error, error.message,)
    }
}

module.exports = {
    changestatus, list
}