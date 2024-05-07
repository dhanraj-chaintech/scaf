const express = require('express');
const CMSRouter = express();

const authorization = require('../../middleware/auth');
const adminRouter=require('./admin/adminRouter');
const authRouter = require('./auth/authRouter');

CMSRouter.use('/auth',authRouter)
CMSRouter.use('/',authorization,adminRouter)

module.exports = CMSRouter;
