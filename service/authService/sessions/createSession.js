import SessionModel from "../../../models/Session.js"

export async function createSession(userId, userAgent) {
    const session = await SessionModel.create({ user: userId, userAgent })
    return session.toJSON()
}