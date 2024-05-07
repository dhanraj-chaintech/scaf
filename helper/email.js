require('dotenv').config();
const nodemailer = require('nodemailer');
const SMTP = process.env.SMTP;
const SMTPPASSWORD = process.env.SMTPPASSWORD;

const sendMail = async (email, mailSubject, content) => {
    try {
        const transport = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            requireTLS: true,
            auth: {
                user: SMTP,
                pass: SMTPPASSWORD
            }
        });

        const mailOption = {
            from: SMTP,
            to: email,
            subject: mailSubject,
            html: content
        };

        transport.sendMail(mailOption, function (error) {
            if (error) {
                logger.log(error);
            } else {
                logger.log("Mail sent");
            }
        });
    } catch (error) {
        logger.log(error);
    }
}

module.exports = sendMail;
