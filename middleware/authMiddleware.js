import JWT from "jsonwebtoken";
import userModel from "../models/User.js";
import { logger } from '../middleware/logMiddleware.js'

// Protected Routes : Token Based
export const authMiddleware = async (req, res, next) => {
    try {
        const decode = JWT.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );
        req.user = decode;
        next();
    } catch (error) {
        logger.info("Error From authMiddleware Start ......")
        logger.info(`Error Message.....\n ${error}`);
        logger.info("Error From authMiddleware End.....")
        return res.status(401).json({
            success: false,
            message: 'Unauthorized',
            error: error,
        });
    }
};


// Admin access
export const adminMiddleware = async (req, res, next) => {
    try {
        logger.info(`is Admin Middleware Requested user id = ${req.user._id}`)
        logger.info(req.user._id)
        const user = await userModel.findById(req.user._id)
        if (user?.role !== 'admin') {
            logger.info('Is Admin MiddleWare Status - False and Unauthorized Accesss')
            return res.status(401).send({
                success: false,
                message: "Auth Failed",
                error
            })
        } else {
            logger.info('Is Admin MiddleWare Status - Success, Unauthorized Accesss and  Redirected to Next Middleware')
            logger.info('User Unauthorized .............')
            logger.info(user)
            next()
        }
    } catch (error) {
        logger.info(error)
        return res.status(401).send({
            success: false,
            message: "Error in ADMIN API",
            error
        })
    }
}
