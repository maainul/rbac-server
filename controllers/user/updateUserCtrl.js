import UserModel from "../../models/User.js";
import validationLog from "../../utils/validationLog.js";
import MValidator from "../../validator/MValidator.js";


export const updateUserCtrl = async (req, res) => {
    try {

        // TODO : User Only Update Ther account.Get Data From Login Info
        // if (req.user.id !== req.params.id) {
        //     return res.status(401).send({
        //         success: false,
        //         message: 'You can update only your account!',
        //     });
        // }

        const id = req.params.id
        const { name, email, mobileNumber } = req.body;
        logger.info(`User Input : ${JSON.stringify(req.body)}`)
        const userData = await UserModel.findById({ _id: id })
        logger.info(`User Already Existed Data : ${userData}`)

        const updatedData = {
            name: name || userData?.name,
            email: email || userData?.email,
            mobileNumber: mobileNumber || userData?.mobileNumber,
        };
        // Validation
        const validationResult = await MValidator(updatedData, validationRules, UserModel);

        // Validation log
        validationLog(validationResult)

        if (!validationResult.isValid) {
            return res.status(400).send({
                success: false,
                message: 'Validation Failed',
                errors: validationResult.errors
            });
        }

        const updatedUserData = await UserModel.findByIdAndUpdate(id, { $set: updatedData }, { new: true });
        logger.info(`User Updated Successfully :\n ${updatedUserData}`);

        return res.status(201).send({
            success: true,
            message: 'User updated Successfully',
            data: updatedUserData,
        });

    } catch (error) {
        console.error('Error In Updated User:', error)

        const status = error.status || 500
        return res.status(status).send({
            success: false,
            message: 'Error In Updated User',
            error: error.message || error,
        });
    }
};