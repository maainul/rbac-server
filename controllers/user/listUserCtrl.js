import UserModel from "../../models/User.js";

export const listUserCtrl = async (req, res) => {
    try {
        const ulist = await UserModel.find()
        ulist.password = undefined
        console.error('Get All User:', ulist)
        return res.status(201).send({
            success: true,
            message: 'User List',
            data: ulist,
        });

    } catch (error) {
        console.error('Error In Updated User:', error)
        const status = error.status || 500
        return res.status(status).send({
            success: false,
            message: 'Error In Get All User List',
            error: error.message || error,
        });
    }
}
