import { logger } from "../../middleware/logMiddleware.js";
import UserModel from "../../models/User.js";
import { accessTokenCookieOptions, hashPassword } from "../../utils/authHelper.js";
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
    const { picture, username, email, password, confirmPassword } = req.body;
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

    // Sign the accessToken OR Create accessToken
    logger.info("Method : signin() - JWT accessToken Creation");
    const jwt = process.env.JWT_SECRET;
    const accessToken = JWT.sign({ _id: savedUser._id }, jwt, { expiresIn: "1d" });
    console.log("User Successfully Registered")

    // Set the accessToken in a HTTP-only cookie
    res.cookie("accessToken", accessToken, accessTokenCookieOptions)

    // Set the refreshToken in a HTTP-only cookie
    // const refreshToken = "mainul"
    // send the accessToken in a HTTP-only cookie
    // res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions)

    return res.send({
      success: true,
      message: "User Successfully Registered"
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
