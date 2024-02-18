import bcrypt from 'bcrypt'
import { logger } from '../middleware/logMiddleware.js'

export const hashPassword = async (pass) => {
    try {
        const salt = 10
        const passToStr = pass.toString()
        logger.info('Method : hashPassword() - Create Hash Password')
        const hashPassword = await bcrypt.hash(passToStr, salt)
        logger.info(`${hashPassword}`)
        logger.info(`Method : hashPassword() - Returned Successfull`)
        return hashPassword
    } catch (error) {
        logger.error(`Method : hashPassword() -  Error While Hashed Password`)
        logger.info(error);
    }
}

export const comparePassword = async (pass, hp) => {
    logger.info('Method: comparePassword() -  Compare Password Funciton is Called')
    const cp = bcrypt.compare(pass, hp)
    logger.info("Data From Compare Password ==========>",cp)
    logger.info('Method : comparePassword() - Compare Password After Funciton Called')
    return cp
}
