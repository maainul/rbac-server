const UserModel = require('../models/User');

const listUser = async (req, res) => {
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


const usrCtrl = {
    listUser
}

module.exports = { usrCtrl }