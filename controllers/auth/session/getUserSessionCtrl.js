import { serv } from "../../../service/services.js"


export const getUserSessionCtrl = async (req, res) => {
    const userId = res.locals.user._id

    const sessions = await serv.authService.sessions.findSessions({ user: userId, valid: true })

    return res.send(sessions)

}

