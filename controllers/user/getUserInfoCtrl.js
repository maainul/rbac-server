import UserModel from "../../models/User.js";
import filterFields from "../../utils/filterFields.js";

export const getUserInfoCtrl = async (req, res) => {
    try {
        // Ensure that req.user and req.user.id are defined
        if (!req.user || !req.user.id) {
            return res.status(401).send({
                success: false,
                message: 'Unauthorized',
                error: 'Invalid or missing user ID in the request',
            });
        }
        
        const userInfo = await UserModel.findById(req.user.id)
        if (!userInfo) {
            return res.status(404).send({
                success: false,
                message: 'User Not Found',
                errors: [{ "field": "id", "error": "user not found" }]
            });
        }

        // Define fields to include in the response
        const fields = ["_id", "username", "email", "mobileNumber", "role", "firstname", "lastname", "area", "town", "city"];
        const userResponse = filterFields(userInfo, fields)
        return res.status(200).send({
            success: true,
            message: "User Info Retrieved Successfully",
            user: userResponse


        });

    } catch (error) {
        console.error('Error In Get User:', error)
        const status = error.status || 500
        return res.status(status).send({
            success: false,
            message: 'Error In Get Single User',
            error: error.message || error,
        });
    }

}
