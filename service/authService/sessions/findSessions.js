import SessionModel from "../../../models/Session.js";


export async function findSessions(query) {
    return SessionModel.find(query).lean()
}