import { logger } from "../../../middleware/logMiddleware.js";
import UserModel from "../../../models/User.js";
import { signJWT, validatePassword } from "../../../utils/authHelper.js";
import validationLog from "../../../utils/validationLog.js";
import MValidator from "../../../validator/MValidator.js";
import { serv } from './../../../service/services.js';


// valiation Rules
const validationRulesSession = {
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

export const createUserSessionCtrl = async (req, res) => {
    try {
        logger.info("Method : sessionCtrl() ==> Start");

        // Destructure data from request body
        const { username, password } = req.body;

        const validationResult = await MValidator(
            req.body,
            validationRulesSession,
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

        // validate the user password
        const user = await validatePassword(username, password)
        if (!user) {
            return res.status(401).send("Invalid Email or Password")
        }

        //create a session
        const session = await serv.authService.sessions.createSession(user._id, req.get("user-agent") || "")

        // console.log(req.locals.user)
        // Add data to req.locals
        // req.locals.user = user; // Add the user object to req.locals

        //crate an access token
        const accessToken = signJWT(
            { ...user, session: session._id },
            process.env.REACT_APP_JWT_ACCESS_TOKEN_PRIVATE_KEY,
            { expiresIn: process.env.REACT_APP_ACCESS_TOKEN_TIME }, // 15 minutes)
        )

        // create a refresh token
        const refreshToken = signJWT(
            { ...user, session: session._id },
            process.env.REACT_APP_JWT_REFRESH_TOKEN_PRIVATE_KEY,
            { expiresIn: process.env.REACT_APP_REFRESH_TOKEN_TIME } // 1 years)
        )

        // return access and refress token
        return res.send({ accessToken, refreshToken })

    } catch (error) {
        logger.error("Internal Server Error");
        const status = error.status || 500;
        return res.status(status).send({
            success: false,
            message: "Internal Server Error",
        });
    }
};

