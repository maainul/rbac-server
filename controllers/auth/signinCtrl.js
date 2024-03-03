
import UserModel from "../../models/User.js";
import MValidator from "../../validator/MValidator.js";
import validationLog from "../../utils/validationLog.js";
import { logger } from "../../middleware/logMiddleware.js";
import { accessTokenCookieOptions, comparePassword, createTokens, refreshTokenCookieOptions, setCookies } from "../../utils/authHelper.js";
import { serv } from '../../service/services.js';

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
        let { username, password } = req.body;
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

        username = username.trim()
        password = password.trim()

        logger.info("Method : signin() - Check User Info Start");
        const validUser = await UserModel.findOne({ username });
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

        //create a session
        const session = await serv.authService.sessions.createSession(user._id, req.get("user-agent") || "")

        // Create Access And Refresh Token
        const {accessToken,refreshToken} = createTokens(user,session)

        // set cookies
        setCookies(res,accessToken,refreshToken)

        // return access and refress token
        return res.send({ accessToken, refreshToken }).send({
            success: true,
            message: "Signin Successfull",
            user: {
                _id: validUser._id,
                username: validUser.username,
                email: validUser.email,
                mobileNumber: validUser.mobileNumber,
                role: validUser.role,
            }
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
