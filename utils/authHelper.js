import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserModel from '../models/User.js'
import { logger } from '../middleware/logMiddleware.js'

export const hashPassword = async (pass) => {
    try {
        const salt = 10
        const passToStr = pass.toString()
        logger.info('Method : hashPassword() - Create Hash Password')
        const hashPassword = await bcrypt.hash(passToStr, salt)
        logger.info(`${hashPassword}`)
        logger.info(`Method : hashPassword() - Returned Successfull`)
        return hashPassword
    } catch (error) {
        logger.error(`Method : hashPassword() -  Error While Hashed Password`)
        logger.info(error);
    }
}

export const comparePassword = async (pass, hp) => {
    logger.info('Method: comparePassword() -  Compare Password Funciton is Called')
    const cp = bcrypt.compare(pass, hp)
    logger.info("Data From Compare Password ==========>", cp)
    logger.info('Method : comparePassword() - Compare Password After Funciton Called')
    return cp
}


export async function validatePassword(username, password) {
    logger.info("Method : validatePassword() ==>  Start");

    // Check User Exists or Not
    const validUser = await UserModel.findOne({ username })
    if (!validUser) return false

    // If User Exists ==> Compare Password
    const validPassword = await comparePassword(password, validUser.password)
    if (!validPassword) return false

    return validUser
}


// Sign JWT With a Private Key
export const signJWT = (user, key, options) => {
    return jwt.sign(user, key, {
        ...(options && options),
        algorithm: 'RS256'
    })
}

// VerifyJWT with a Public Key
export const verifyJWT = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.REACT_APP_JWT_ACCESS_TOKEN_PUBLIC_KEY)
        return {
            valid: true,
            expired: false,
            decoded
        }
    } catch (error) {
        return {
            valid: false,
            expired: error.message === "JWT expired",
            decoded: null
        }
    }
}


export const accessTokenCookieOptions = {
    httpOnly: true,
    maxAge: 900000,
    secure: true,
    sameSite: "none"
}


export const refreshTokenCookieOptions = {
    ...accessTokenCookieOptions,
    maxAge: 3.154e10, // 1 Year
}
