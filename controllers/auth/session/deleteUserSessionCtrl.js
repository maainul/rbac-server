import { deleteSessions } from "../../../service/authService/sessions/deleteSessions.js"


export const deleteUserSessionCtrl = async (req, res) => {
    const sessionId = res.locals.user.session
    await deleteSessions({ _id: sessionId }, { valid: false })
}

