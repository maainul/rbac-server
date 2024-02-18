import { logger } from "../../middleware/logMiddleware.js";
import UserModel from "../../models/User.js";
import { SignupUserService } from "../../service/Auth.js";
import MValidator from "../../validator/MValidator.js";

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
    const validationResult = await MValidator(
      req.body,
      validationRules,
      UserModel
    );
    // Validation log
    logger.info("Validation Result");
    if (!validationResult.isValid) {

      return res.status(201).send({
        success: true,
        message: "Validation Failed",
        errors: validationResult.errors,
      });
    }
    //Registration Service Call
    logger.info("Signup Service Start");
    const user = await SignupUserService(req.body);
    logger.info("Signup Service End");
    logger.info("User Registration Successfully");
    return res.status(201).send({
      success: user.success,
      message: user.message,
      data: user.data,
    });
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
