const {S3Client, ListObjectsV2Command, GetObjectCommand, DeleteObjectCommand} = require('@aws-sdk/client-s3');
const fs = require('fs')
const statuscode = require('../../../helper/statuscode')
const response = require('../../../helper/response')
const {logger} = require("../../utils/logger.js");

const s3 = new S3Client({
    region: process.env.S3_REGION,
    credentials: {
        secretAccessKey: process.env.S3_SECRET_KEY,
        accessKeyId: process.env.S3_ACCESS_KEY
    }
});

const uploadFile = async (req, res) => {
    try {
        response(res, statuscode.success_code, 'File uploaded successfully!',)
    } catch (error) {
        logger.log("error in uploadFile");
        response(res, statuscode.internal_server_error, "Error while uploading...",)
    }
}

const listFile = async (req, res) => {
    try {
        const command = new ListObjectsV2Command({
            Bucket: process.env.S3_BUCKET_NAME
        });

        const result = await s3.send(command);
        const contents = result.Contents;

        if (contents && contents.length > 0) {
            const fileLinks = contents.map(item => {
                return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.S3_REGION}.amazonaws.com/${item.Key}`;
            });
            contents.forEach(item => {
                logger.log(item.Key);
            });
            response(res, statuscode.success_code, "files....", fileLinks)
        } else {
            response(res, statuscode.not_found_error, "No item found...",)
        }
    } catch (error) {
        logger.log("error in listFile");
        response(res, statuscode.internal_server_error, "Error while fetching...",)
    }
}

const downloadFile = async (req, res) => {
    try {
        const {id: fileKey} = req.params;
        const localFilePath = '../../../example/krish.txt'
        const command = new GetObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: fileKey
        });

        const result = await s3.send(command);
        const fileStream = fs.createWriteStream('example/krish.txt', {encoding: 'utf-8'});
        result.Body.pipe(fileStream);
        fileStream.on('finish', () => {
            logger.log('File writing completed successfully.');
        });
        fileStream.on('error', (error) => {
            logger.error('An error occurred while writing the file:', error);
        });

        response(res, statuscode.success_code, `File downloaded successfully to: ${localFilePath}`,)
    } catch (error) {
        logger.log("error in downloadFile");
        response(res, statuscode.internal_server_error, "Error while downloading...",)
    }
}

const deleteFile = async (req, res) => {
    try {
        const {id: fileKey} = req.params;

        const command = new DeleteObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: fileKey
        });

        const result = await s3.send(command);
        response(res, statuscode.success_code, `File deleted successfully: ${fileKey}`,)

    } catch (error) {
        logger.log("error in deleteFile");
        response(res, statuscode.internal_server_error, "Error while deleting...",)
    }
}

module.exports = {
    uploadFile, listFile, downloadFile, deleteFile
}