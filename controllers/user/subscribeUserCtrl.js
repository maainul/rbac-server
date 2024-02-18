import { logger } from "../../middleware/logMiddleware.js";
import SubscribeUserModel from "../../models/SubscribeUser.js"
import generateVerificationCode from "../../utils/getVerificationCode.js"
import { saveToDb } from "../../utils/saveUtils.js";
import MValidator from "../../validator/MValidator.js"
// import sendMail from './../../utils/sendVerificationEmail.js';

const validationRules = {
    name: {
        type: 'string',
        required: [true, 'Name is required'],
    },
    email: {
        type: 'string',
        required: [true, 'Email is required'],
    },

}

export const subscribeUserCtrl = async (req, res) => {
    try {
        const { email, name, subscriptionFor } = req.body
        // TODO : Get Data From User 
        // Get Data From Tick Subscription (email) //Get Data From React Frontend Context api / Redux
        // const user = await UserInfo.find({ email: req.body.email })
        //const user = await UserInfo.find(user => user.email === email)

        const validationResult = await MValidator(req, validationRules, SubscribeUserModel)

        validationLog(validationResult)

        if (!validationResult.isValid) {
            return res.status(400).send({
                success: false,
                message: 'Validation Failed',
                errors: validationResult.errors
            })
        }

        // generate Code 
        const verificationCode = generateVerificationCode();

        const result = await sendMail(email, verificationCode)
        if (result.success) {
            const subsUser = await saveToDb(SubscriptionModel, {
                name: name,
                email: email,
                verificationCode: verificationCode
            })

            logger.info(`User Subscription Added Successfully :\n ${subsUser}`)
            return res.status(201).send({
                success: true,
                message: 'User Subscription Successful',
                data: subsUser
            })
        } else {
            logger.info(`Email Send Failed :\n ${result.data}`)
            return res.status(400).send({
                success: result.success,
                data: result.data,
                message: result.message
            })
        }
    } catch (error) {
        console.error('Error In User Subscription API:', error)
        const status = error.status || 500
        return res.status(status).send({
            success: false,
            message: 'Error In User Subscription API',
            error: error.message || error,
        })
    }
}
