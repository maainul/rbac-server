import JWT from 'jsonwebtoken';
import UserModel from "../../models/User.js";
import MValidator from "../../validator/MValidator.js";
import validationLog from "../../utils/validationLog.js";
import { logger } from "../../middleware/logMiddleware.js";
import { comparePassword } from "../../utils/authHelper.js";

//
const validationRulesLogin = {
    username: {
        type: "string",
        required: true,
        max: 50,
        min: 3,
    },
    password: {
        type: "string",
        required: true,
        max: 50,
        min: 3,
    },
};

export const signinCtrl = async (req, res) => {
    try {
        console.log("Singin Server : Signin Ctrl Called")
        const { username, password } = req.body;
        const validationResult = await MValidator(
            req.body,
            validationRulesLogin,
            UserModel
        );

        // Validation log
        validationLog(validationResult);
        if (!validationResult.isValid) {
            return res.status(201).send({
                success: true,
                message: "Validation Failed",
                errors: validationResult.errors,
            });
        }

        logger.info("Method : signin() - Check User Info Start");
        const validUser = await UserModel.findOne({ username });
        logger.info(validUser);
        logger.info("Method : signin() - Check User Info Start End");

        if (!validUser) {
            return res.status(201).send({
                success: true,
                message: "User Not Registered",
                errors: [{ field: "username", error: "user not found" }],
            });
        }

        logger.info("Method : signin() - Compare Password with the server");
        const validPassword = await comparePassword(password, validUser.password);
        logger.info("Password Check From Compare Password : ");
        logger.info(validPassword);
        logger.info("Method : signin() - Password is valid");
        if (!validPassword) {
            logger.info("Wrong Credentials.Password don't Match");

            return res.status(201).send({
                success: true,
                message: "Wrong Credentials",
                errors: [{ field: "password", error: "password doesn't match" }],
            });
        }
        
        // Sign in with token
        logger.info("Method : signin() - JWT Token Creation");
        const jwt = process.env.JWT_SECRET;
        const token = JWT.sign({ _id: validUser._id }, jwt, {
                expiresIn: "1d",
        });
        logger.info("Method : signin() - Token Created");
        logger.info("Signin Successfull");

        // send the token in the HTTP-only 
        return res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            sameSite:"none"
        }).send({
            success:true,
            message:"Signin Successfull"
        })
    
    } catch (error) {
        logger.error("Internal Server Error");
        logger.error(error);
        const status = error.status || 500;
        return res.status(status).send({
            success: false,
            message: "Internal Server Error",
            errors: error,
        });
    }
};
