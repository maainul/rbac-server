import { logger } from "../../middleware/logMiddleware.js";
import UserModel from "../../models/User.js";



export const currentUserCtrl = async (req, res) => {
    try {
        logger.info("currentUserCtrl  Start");

        console.lo("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
        console.log(req.body.userId)
        console.lo("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")

        const user = await UserModel.findOne({ _id: req.body.userId })
        console.log("####################################")
        console.lo(user)
        console.log("####################################")
        logger.info("User Fetched Successfully");
        return res.status(201).send({
            success: true,
            message: "User Fetched Successfully",
            data: user,
        });
    } catch (error) {
        logger.error("Get Current User Failed");
        const status = error.status || 500;
        return res.status(status).send({
            success: false,
            message: "Unable to get current user",
            error: error.message || error,
        });
    }
};

