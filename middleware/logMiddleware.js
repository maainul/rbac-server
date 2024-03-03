// logger.js

import winston from 'winston';
import stripAnsi from 'strip-ansi';


const logFormatConsole = winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(info => {
        return `${info.timestamp} ${info.level}: ${info.message}\n`; // Append \n for newline
    })
);

const logFormatFile = winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(info => {
        return `${info.timestamp} ${info.level}: ${info.message}\n`; // Append \n for newline
    })
);


// Create logger with transports
const logger = winston.createLogger({
    level: 'info',
    format: logFormatFile,
    transports: [
        new winston.transports.Console(), // Console transport
        new winston.transports.File({
            filename: 'server.log',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.printf(info => {
                    // Remove ANSI escape codes before writing to file
                    const messageWithoutAnsi = stripAnsi(info.message);
                    return `${info.timestamp} ${info.level}: ${messageWithoutAnsi}`;
                })
            )
        })
    ]
});

export { logger };
