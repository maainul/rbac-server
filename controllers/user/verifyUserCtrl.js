

export const verifyUserCtrl = async (req, res) => {
    try {
        const { email, name, verificationCode } = req.body

        const user = await UserInfo.find(user => user.email === email)
        if (user.verificationCode === verificationCode) {
            const saveUserInfo = await save(SubscriptionModel, {
                name: user?.name,
                email: user?.email,
                subscribeDate: user?.date, // Set to the current date and time
                subscriptionFor: user?.subscriptionFor,
                subscriptionStatus: true,
            })
            return res.status(201).send({
                success: true,
                data: saveUserInfo,
                message: "Verfication Successful"
            })
        } else {
            return res.status(400).send({
                success: result.success,
                data: result.data,
                message: "Email Verification Failed"
            })
        }
    } catch (error) {
        console.error('Error In Veriry API:', error)
        const status = error.status || 500
        return res.status(status).send({
            success: false,
            message: 'Error In Veriry API',
            error: error.message || error,
        })
    }
}