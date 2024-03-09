import { serv } from "../service/services.js";
import { verifyJWT } from "../utils/authHelper.js";



const deserializeUser = async (req, res, next) => {

    // const accessToken = req.cookie.accessToken || ((req.headers && req.headers.authorization) || "").replace(/^Bearer\s/, "");
    const accessToken = ((req.headers && req.headers.authorization) || "").replace(/^Bearer\s/, "");
    const refreshToken =  req.cookie.refreshToken ||  req.get('x-refresh')

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

            res.cookie("accessToken",newAccessToken,{
            maxAge:900000, // 15 mim
            httpOnly:true,
            domain:'localhost',
            path:'/',
            sameSite:'strict',
            secure:false
        })

        }

        const result = verifyJWT(newAccessToken)
        res.locals.user = result.decoded
        return next()

    }

    return next()
}

export default deserializeUser