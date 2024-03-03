import SessionModel from '../../../models/Session.js'
import { signJWT, verifyJWT } from "../../../utils/authHelper.js";


export async function reIssueAccessToken(refreshToken) {
    const { decoded } = verifyJWT(refreshToken)
    if (!decoded || !get(decoded, '_id')) return false

    const session = SessionModel.findById(get(decoded, "_id"))

    if (!session || !session.valid) {
        return false
    }

    const user = await findUser({ _id: session.user })

    const accessToken = signJWT(
        { ...user, session: session._id },
        process.env.REACT_APP_JWT_ACCESS_TOKEN_PRIVATE_KEY,
        { expiresIn: process.env.REACT_APP_ACCESS_TOKEN_TIME }, // 15 minutes)
    )


    return accessToken
}