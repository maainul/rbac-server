import UserModel from "../../models/User.js";
import axios from 'axios';
import qs from 'qs'
import { accessTokenCookieOptions, createSession, refreshTokenCookieOptions }
    from "../../utils/authHelper.js";

export const googleOAuthCtrl = async (req, res) => {
    try {
        console.log("Google Auth Controler:  Start")

        //Get the code from querystring
        const code = req.query.code

        // Get the id and access accessToken with the code
        const { id_token, access_token } = await getGoogleOAuthTokens({ code })

        // Get the user with tokens
        const googleUser = await getGoogleUser({ id_token, access_token })

        // upsert the user
        const user = await UserModel.findByIdAndUpdate({
            email: googleUser.email,

        }, {
            email: googleUser.email,
            name: googleUser.name,
            picture: googleUser.picture
        }, {
            upsert: true,
            new: true
        })

        console.log("#################")
        console.log(user)
        console.log("#################")

        // create a session 
        // const session = createSession()
        // console.log(session)

        // create access & refesh tokens
        const accessToken = access_token
        // const refreshToken = access_token

        // set cookies
        res.cookie("accessToken", accessToken, accessTokenCookieOptions)
        // res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions)

        // redirect back to client
        res.redirect(`${process.env.REACT_APP_API_URL}/dashboard`)

    } catch (error) {
        console.log("Method : googleOAuthCtrl() ==> Failed to authorize Google user")
        return res.redirect(`${process.env.REACT_APP_API_URL}/oauth/error`)
    }
};





// interface GoogleTokenResult{
//     access_token:string;
//     expires_in:Number;
//     refresh_token:string;
//     scope:string;
//     id_token:string
// }

export async function getGoogleOAuthTokens({ code }) {
    const url = 'https://oauth2.googleapis.com/token';
    const values = {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URI,
        grant_type: 'authorization_code',
    }
    try {
        const res = await axios.post(url, qs.stringify(values), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        return res.data
    } catch (error) {
        console.error('Method :getGoogleOAuthTokens() ==> Failed to Fetch Google OAuth Tokens')
        throw new Error(error.message)
    }
}




/***************************
 * This Function Will return the User Information From Google Server
{
//     id: '105894404624384591123',
//     email: 'mdevhasan@gmail.com',
//     verified_email: true,
//     name: 'mdev hasan',
//     given_name: 'mdev',
//     family_name: 'hasan',
//     picture: 'https://lh3.googleusercontent.com/a/ACg8ocKPJUcKE2DSV0YF8iolF06XyVeDvg4JNjl_ESMX64YuCw=s96-c',
//     locale: 'en'
//   }
***************************/
export async function getGoogleUser({ id_token, access_token }) {
    try {
        const res = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`, {
            headers: {
                Authorization: `Bearer ${id_token}`
            }
        })
        return res.data
    } catch (error) {
        console.log(error, "Error Fetch in Google User")
        throw new Error(error.message)
    }
}
