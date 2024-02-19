import { logger } from "../../middleware/logMiddleware.js";
import UserModel from "../../models/User.js";
import { hashPassword } from "../../utils/authHelper.js";
import MValidator from "../../validator/MValidator.js";
import JWT from 'jsonwebtoken';

// Validation Rules
const validationRules = {
  email: {
    type: "string",
    required: true,
    max: 50,
    min: 3,
    exists: [true, "Email already exists"],
  },
  username: {
    type: "string",
    required: true,
    max: 50,
    min: 3,
    exists: [true, "Username already exists"],
  },
  password: {
    type: "string",
    required: true,
    max: 50,
    min: 3,
  },
};


export const signupCtrl = async (req, res) => {
  logger.info("Signup Controller Started");
  try {
    // Validation
    logger.info("Validation Started");
    const { username, email, password, confirmPassword } = req.body;
    const validationResult = await MValidator(
      req.body,
      validationRules,
      UserModel
    );

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
      username,
      email,
      password: hashedPassword,
    })
    const savedUser = await newUser.save()

    // Sign the token
    logger.info("Method : signin() - JWT Token Creation");
    const jwt = process.env.JWT_SECRET;
    const token = JWT.sign({ _id: savedUser._id }, jwt, { expiresIn: "1d" });
    console.log("User Successfully Registered")
    // send the token in a HTTP-only cookie
    return res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    }).send({
      success: true,
      message: "User Successfully Registered"
    })

  } catch (error) {
    logger.error("Errror in Uer Registration");
    const status = error.status || 500;
    return res.status(status).send({
      success: false,
      message: "Error In User Registration.",
      error: error.message || error,
    });
  }
};
