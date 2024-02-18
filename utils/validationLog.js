import { logger } from '../middleware/logMiddleware.js'

const validationLog = (validationResult) => {
    const isValid = validationResult.isValid;
    const errors = validationResult.errors;
    if (isValid) {
        logger.info('Method : validationLog() - Validation Successful'.bgGreen);
    } else {
        logger.error('Method : validationLog() - Validation Failed in these fields'.bgRed);
        if (isValid != undefined && !errors != undefined) {
            for (const error of errors) {
                logger.error(`Field : ${error.field} Error: ${error.error}`.bgRed);
            }
        }
    }
};

export default validationLog;
