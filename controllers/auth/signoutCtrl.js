import { logger } from "../../middleware/logMiddleware.js";

export const signoutCtrl = async (req, res) => {
    try {
        console.log("Signout Server : Signout Ctrl Called")
        return res.cookie("token","",{
            httpOnly:true,
            expires: new Date(0)
        }).send({
            success:true,
            message:"Logout Successfully"
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
