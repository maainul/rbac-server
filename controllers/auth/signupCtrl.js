import { logger } from "../../middleware/logMiddleware.js";
import UserModel from "../../models/User.js";
import { serv } from "../../service/services.js";
import { accessTokenCookieOptions, createTokens, hashPassword, setCookies } from "../../utils/authHelper.js";
import MValidator from "../../validator/MValidator.js";
import JWT from 'jsonwebtoken';

// Validation Rules
const validationRules = {
  email: {
    type: "string",
    required: true,
    max: 50,
    min: 10,
    exists: [true, "Email already exists"],
  },
  username: {
    type: "string",
    required: true,
    max: 16,
    min: 3,
    exists: [true, "Username already exists"],
  },
  password: {
    type: "string",
    required: true,
    max: 20,
    min: 4,
  },
  picture: {
    type: "string",
  },
};




export const signupCtrl = async (req, res) => {
  logger.info("Signup Controller Started");
  try {
    // Validation For Empty and Existing Email
    logger.info("Validation Started");
    let { picture, username, email, password, confirmPassword } = req.body;

    // picture = picture.trim()
    // email = email.trim()
    // password = password.trim()
    // confirmPassword = confirmPassword.trim()
    // username = username.trim()

    const validationResult = await MValidator(
      req.body,
      validationRules,
      UserModel
    );

    // Compare Password and Confirm Password
    if (password !== confirmPassword) {
      validationResult.errors.push({ field: "password", error: "Password don't match" })
      return res.status(201).send({
        success: true,
        message: "Validation Failed",
        errors: validationResult.errors,
      });
    }

    // Validation log
    logger.info("Validation Result");
    if (!validationResult.isValid) {
      return res.status(201).send({
        success: true,
        message: "Validation Failed",
        errors: validationResult.errors,
      });
    }

    // HASH PASSWORD
    const hashedPassword = await hashPassword(req.body.password)

    // Save Data to DB
    const newUser = new UserModel({
      picture,
      username,
      email,
      password: hashedPassword,
    })
    const savedUser = await newUser.save()

    //create a session
    const session = await serv.authService.sessions.createSession(savedUser._id, req.get("user-agent") || "")

    //crate an access token
    const { accessToken, refreshToken } = createTokens(savedUser, session)

    // set cookies
    setCookies(res, accessToken, refreshToken)

    // return access and refress token
    return res.send({ accessToken, refreshToken }).send({
      success: true,
      message: "Signup Successfull",
      user: {
        _id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        mobileNumber: savedUser.mobileNumber,
        role: savedUser.role,
      }
    })

  } catch (error) {
    logger.error("Errror in Uer Registration");
    console.log(error)
    const status = error.status || 500;
    return res.status(status).send({
      success: false,
      message: "Error In User Registration.",
      error: error.message || error,
    });
  }
};
