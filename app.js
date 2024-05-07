require('dotenv').config()
require('module-alias/register');

// other way
// const data = require('dotenv').config()
// logger.log(data.parsed.MONGO_URI);
// logger.log(data)

const express = require('express');
const app = express();

const CMSRouter = require('./routes/CMS/index.js')
const frontRouter = require('./routes/front/index.js')
const db = require('./config/connect.js')
const notFound = require('./middleware/notFound.js')
app.use(express.json());
const {logger} = require("./utils/logger.js");

app.use('/api/v1/cms', CMSRouter);
app.use('/api/v1/front', frontRouter);

app.use(notFound)

const PORT = 3000;

const start = async () => {
    try {
        await db(process.env.MONGO_URI);
        app.listen(PORT, logger.log(`server is listening ${PORT}`));
    } catch (error) {
        logger.log(error);
    }
}
start();



// user:raise query,see list of query
// support :can reply to the query