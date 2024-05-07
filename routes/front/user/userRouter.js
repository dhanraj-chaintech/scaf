const express = require('express');
const userRouter = express.Router();
const { seeList, raiseQuery, terminate} = require('../../../controller/front/user/userController')
const { showchat, reply } = require('../../../controller/front/chat/chatController')

userRouter.post('/raise', raiseQuery)
userRouter.get('/raise/list', seeList)
userRouter.patch('/changestatus/:id', terminate)

userRouter.post('/chat/:id', reply)
userRouter.post('/showchat/:id', showchat)
module.exports = userRouter;
