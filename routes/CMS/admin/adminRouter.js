const express = require('express');
const adminRouter = express.Router();

const { changestatus, list } = require('@app/controller/CMS/support/supportController.js')
const { analysis } = require('@app/controller/CMS/master/masterController')
const { reply, showchat } = require('@app/controller/front/chat/chatController')

// support
adminRouter.patch('/support/changestatus/:id', changestatus);
adminRouter.get('/support/list', list);
adminRouter.post('/support/chat/:id', reply);
adminRouter.get('/support/showchat/:id', showchat);

// master
adminRouter.get('/master/analysis', analysis);


module.exports = adminRouter;
