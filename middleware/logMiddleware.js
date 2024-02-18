// logger.js

import winston from 'winston';


const logFormatConsole = winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(info => {
        return `${info.timestamp} ${info.level}: ${info.message}`;
    })
);

const logFormatFile = winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(info => {
        return `${info.timestamp} ${info.level}: ${info.message}`;
    })
);


const logger = winston.createLogger({
    level: 'info',
    format: logFormatConsole,
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                logFormatConsole
            )
        }),
        new winston.transports.File({
            filename: 'server.log',
            format: logFormatFile
        })
    ]

});

export { logger };
