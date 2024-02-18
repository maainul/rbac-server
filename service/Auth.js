import { logger } from '../middleware/logMiddleware.js';
import UserModel from '../models/User.js';
import { hashPassword } from './../utils/authHelper.js';
import { saveToDb } from './../utils/saveUtils.js';


export const SignupUserService = async (body) => {
    try {
        logger.info('Signup Service Called.......................................')
        const { email, username, password } = body;
        logger.info('Signup Service Hashed Password Start.........')
        const hashedPassword = await hashPassword(password)
        logger.info(`Signup Service Hashed Password End with info : ${hashedPassword}`)
        // Save Data in Database
        logger.info(`Save Into Database start..........`)
        const user = await saveToDb(UserModel, {
            email,
            username,
            password: hashedPassword,
        })
        logger.info(`Save Into Database end with info`)
        logger.info(user)
        logger.info(`User Added Successfully`)
        return {
            success: true,
            message: "User Added Successfully",
            data: user
        }
    } catch (error) {
        logger.info(`User Not Added Successfully`)
        return {
            success: false,
            message: "Internal Server Error",
            data: {}
        }
    }
}



