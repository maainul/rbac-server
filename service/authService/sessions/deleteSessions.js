import SessionModel from "../../../models/Session.js";

// Delete Session Not Delete Session.It Only Update the status : false
export async function deleteSessions(query, update) {
    return SessionModel.updateOne(query, update).lean()
}