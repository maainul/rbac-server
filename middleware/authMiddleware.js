import JWT from "jsonwebtoken";
import userModel from "../models/User.js";
import { logger } from '../middleware/logMiddleware.js'
import UserModel from "../models/User.js";

/*
    Algorithm For authMiddleware

    1. get token From client request
    2. If Access Token not available then unauthrized
    3. Else verify jwt with token and jwt_secret
    4. It will give UserId

*/


// Protected Routes : Token Based
export const authMiddleware = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken
        if (!accessToken) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized',
                error: "",
            });
        }
        const verified = JWT.verify(accessToken, process.env.JWT_SECRET);
        // this verified contains user id because we create cookie based on this id
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

/*
    Algorithm of Logged in Or Not

    1. From Request take access Token
    2. If Not Found Access Token then loggedIn false and user object is empty
    3. If Found the Verify Access tken with server Secrect key .
    4. If Verify is Successful then return true and UserInfomation with the response



*/

// Check User Logged In or Not
export const loggedIn = async (req, res) => {
    try {
        const accessToken = req.cookies.accessToken
        if (!accessToken) return res.json({ loggedIn: false, user: {} });

        // Verfiy User and Get User ID
        const verify = JWT.verify(accessToken, process.env.JWT_SECRET);
        console.log(`Logged in User id = ${verify._id}`.bgMagenta)

        // Fetch User Info After Verify User
        const user = await UserModel.findById(verify._id)

        res.json({ loggedIn: true, user: user });
    } catch (error) {
        logger.info(`You don't Have Verified Token.`);
        return res.json({ loggedIn: false, user: {} });
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
