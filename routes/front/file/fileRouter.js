const express = require('express');
const fileRouter = express.Router();
const { upload } = require('../../../middleware/upload')
const { uploadFile, listFile, downloadFile, deleteFile } = require('../../../controller/front/file/fileController')

fileRouter.post('/upload', upload.single("file"), uploadFile)
fileRouter.get('/list', listFile)
fileRouter.get('/download/:id', downloadFile)
fileRouter.delete('/delete/:id', deleteFile)

module.exports = fileRouter;

