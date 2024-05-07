const express = require('express');
const authRouter = express.Router();
const { register, login } = require('@app/controller/front/auth/authentication')

authRouter.post('/register', register)
authRouter.post('/login', login)

module.exports = authRouter;
