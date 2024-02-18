import { logger } from "../../middleware/logMiddleware.js";
import { saveToDb } from "../../utils/saveUtils.js";


export const unSubscribeUserCtrl = async (req, res) => {
    try {
        const { email } = req.body
        // Get Data From Tick Subscription (email) //Get Data From React Frontend Context api / Redux
        // const user = await UserInfo.find({ email: req.body.email })
        const user = await UserInfo.find(user => user.email === email)
        if (user == undefined) {
            return res.status(400).send({
                success: false,
                message: `You don't have any subscription. Please Subscribe First`,
                data: 'Subscription Link:www.subscription.com'
            })
        }

        const unSubsUser = await saveToDb(SubscriptionModel, {
            name: user?.name,
            email: user?.email,
            subscribeDate: user?.date, // Set to the current date and time
            subscriptionFor: user?.subscriptionFor,
            subscriptionStatus: false
        })
        logger.info(`User UnSubscribe Successfully :\n ${unSubsUser}`)
        return res.status(201).send({
            success: true,
            message: 'User UnSubscribe Successful',
            data: unSubsUser
        })

    } catch (error) {
        console.error('Error UnSubscribe API:', error)
        const status = error.status || 500
        return res.status(status).send({
            success: false,
            message: 'Error In User UnSubscribe API',
            error: error.message || error,
        })
    }
}
