import JWT from "jsonwebtoken";
import userModel from "../models/User.js";
import { logger } from '../middleware/logMiddleware.js'
import UserModel from "../models/User.js";

// Protected Routes : Token Based
export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized',
                error: "",
            });
        }
        const verified = JWT.verify(token, process.env.JWT_SECRET);
        // this verified contains user id because we create cookie based on this id id sidn up controller
        //  const token = JWT.sign({ _id: savedUser._id }, jwt, { expiresIn: "1d" });
        req.user = verified.user;
        next();
    } catch (error) {
        logger.info(`Error Message.....\n ${error}`);
        return res.status(401).json({
            success: false,
            message: 'Unauthorized',
            error: "",
        });
    }
};


// Check User Logged In or Not
export const loggedIn = async (req, res) => {
    try {
        const token = req.cookies.token
        if (!token) return res.json(false);
        // Verfiy User and Get User ID
        const verify = JWT.verify(token, process.env.JWT_SECRET);
        console.log(`Logged in User id = ${verify._id}`.bgMagenta)
        // Fetch User Info After Verify User
        const user = await UserModel.findById(verify._id)
        res.json({ loggedIn: true, user: user });
    } catch (error) {
       logger.info(`You don't Have Verified Token.`);
        return res.json({ loggedIn: false });
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
