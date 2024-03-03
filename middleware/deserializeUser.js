import { serv } from "../service/services.js";
import { verifyJWT } from "../utils/authHelper.js";



const deserializeUser = async (req, res, next) => {

    const accessToken = ((req.headers && req.headers.authorization) || "").replace(/^Bearer\s/, "");
    const refreshToken = req.get('x-refresh')

    if (!accessToken) return next()

    const { decoded, expired } = verifyJWT(accessToken)
    if (decoded) {
        res.locals.user = decoded
        return next()
    }

    if (expired && refreshToken) {
        const newAccessToken = await serv.authService.sessions.reIssueAccessToken({ refreshToken })

        if (newAccessToken) {
            res.setHeader('x-access-token', newAccessToken)
        }

        const result = verifyJWT(newAccessToken)
        res.locals.user = result.decoded
        return next()

    }

    return next()
}

export default deserializeUser