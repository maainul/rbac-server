import SessionModel from "../../../models/Session.js";


export async function findUser(query) {
    return SessionModel.findOne(query).lean()
}
