require('dotenv').config();
const replys = require('../../../model/reply')
const statuscode = require('../../../helper/statuscode')
const response = require('../../../helper/response')

const reply = async (req, res) => {
    try {
        req.body.to = req.params.id;
        req.body.from = req.body.name;
        const details1 = await replys.create(req.body);
        response(res, statuscode.success_code, "Message sent",)

        // if we dont want separate route for show chat
        // const { id } = req.params;
        // const details2 = await replys.find({ to: id }, { reply: 1, from: 1 }).sort({ createdAt: 1 });

        // res.json({ msg: "replied!!", reply: details1,chatthread:details2})

    } catch (error) {
        logger.log("error in reply");
        response(res, statuscode.internal_server_error, error.message,)
    }
}

const showchat = async (req, res) => {
    try {
        const {id} = req.params;
        const details = await replys.find({to: id}, {reply: 1, from: 1}).sort({createdAt: 1});
        response(res, statuscode.success_code, "chat thread...", details);
    } catch (error) {
        logger.log("error in showchat");
        response(res, statuscode.internal_server_error, error.message,)
    }
}

module.exports = {
    reply, showchat
}