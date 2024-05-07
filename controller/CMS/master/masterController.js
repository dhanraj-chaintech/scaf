const queryschema = require('../../../model/query')
const statuscode = require('../../../helper/statuscode')
const response = require('../../../helper/response')

const analysis = async (req, res) => {
    try {
        const result = await queryschema.find({}, {support: 1, title: 1, details: 1, hourtosolve: 1, _id: 0});
        response(res, statuscode.success_code, "analysis of tickets..", result)
    } catch (error) {
        logger.log("error in analysis");
        response(res, statuscode.internal_server_error, error.message,)
    }
}
module.exports = {
    analysis
}