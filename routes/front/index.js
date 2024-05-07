require('dotenv').config()

const express = require('express');
const frontRouter = express();
const userRouter = require('./user/userRouter');
const fileRouter = require('./file/fileRouter');
const authRouter = require('./auth/authRouter');
const authorization = require('../../middleware/auth');

frontRouter.use('/user/auth', authRouter)
frontRouter.use('/user/query/file', authorization, fileRouter)
frontRouter.use('/user', authorization, userRouter)
module.exports = frontRouter;
