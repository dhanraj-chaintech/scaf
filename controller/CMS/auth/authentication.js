const secret = process.env.JWT_KEY;
const jwt = require('jsonwebtoken')
const csmSchema = require('../../../model/CSM');
const response = require('@app/helper/response')
const statuscode = require('@app/helper/statuscode')
const bcrypt = require('bcrypt');
const {logger} = require("@app/utils/logger.js");


const register = async (req, res) => {
    try {
        const data = await csmSchema.find({_id: req.body._id});
        if (data.length == 0) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10); // 10 is the saltRounds
            req.body.password = hashedPassword;
            const details = await csmSchema.create(req.body);
            response(res, statuscode.success_code, "user registered successfully",)
        }
        else {
            response(res, statuscode.bad_request, "user exists",)
        }
    } catch (error) {
        logger.log("error in register");
        response(res, statuscode.internal_server_error, error.message,)
    }
}

const login = async (req, res) => {
    try {
        const data = await csmSchema.find({_id: req.body._id});
        if (data.length == 0) {
            response(res, statuscode.not_found_error, "No user found!",)
        }
        else {
            const passwordMatch = await bcrypt.compare(req.body.password, data[0].password);
            if (passwordMatch) {
                const jwttoken = jwt.sign({id: data[0]._id}, secret, {expiresIn: '24h'});
                response(res, statuscode.success_code, "Logged in...", jwttoken)
            }
            else {
                response(res, statuscode.unauthorized_code, "Incorrect password!",)
            }
        }
    } catch (error) {
        logger.log("error in login");
        response(res, statuscode.internal_server_error, error.message,)
    }
}
module.exports = {
    register, login
}