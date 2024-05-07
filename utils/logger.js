const pinoLogger = require("./pino")


let logger= "pino"

if (logger === "pino") {
    logger = pinoLogger
} else {
    logger = console
}

class Logger {
    warn(text1, text2) {
        logger.warn(`${text1}  ${text2}`)
    }

    error(text1, text2) {
        logger.error(`${text1}  ${text2}`)
    }

    info(text1, text2) {
        logger.info(`${text1}  ${text2}`)
    }
}
module.exports = new Logger()

