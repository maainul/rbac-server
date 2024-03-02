# Backend-Starter

Resource : 
https://www.youtube.com/playlist?list=PLJM1tXwlGdaf57oUx0rIqSW668Rpo_7oU


## Google Auth :
https://www.youtube.com/watch?v=Qt3KJZ2kQk0


## How to Add Google Auth :

###  go to this link :  For API & Service dashboard :

https://console.cloud.google.com/apis/dashboard 


1. Step One Create New Project : 

![image](https://github.com/maainul/rbac-client/assets/37740006/08d668b6-5377-4d13-9e97-0300f4bcab02)

2. I Create New Project : rbac
![image](https://github.com/maainul/rbac-client/assets/37740006/b1b6b574-5c30-4436-8784-284ad03998e8)

3. Go to OAuth Consent Screen :

![image](https://github.com/maainul/rbac-client/assets/37740006/4f5654bf-ba41-422a-90b1-4ea20582ccc5)

4. And Select External and save info
![image](https://github.com/maainul/rbac-client/assets/37740006/5a65337a-3fe3-4c9f-856d-aaaeade815d7)

5. Add or Remove Scope
![image](https://github.com/maainul/rbac-client/assets/37740006/d52eece5-cd9d-40b3-92cd-e3a918172184)


6. Add Test Users also Then Summary. Then Go to Credentials
![image](https://github.com/maainul/rbac-client/assets/37740006/1e3e4e24-3980-4a18-a3b2-f9074040d7e7)

7. Client Id : Authorized redirect URIs

![image](https://github.com/maainul/rbac-client/assets/37740006/b895f359-eadb-4c0b-860b-02f4b1a949f2)

8. Download The JSON :
```json
{
    "web": {
        "client_id": "578187234840-c9s8gdnukn5uc9764d1j3uoksgua4dqk.apps.googleusercontent.com",
        "project_id": "rbac-415913",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/accessToken",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_secret": "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",
        "redirect_uris": [
            "http://localhost:8081/api/oauth/google"
        ],
        "API_KEY_1":"AIzaSyAHi8FoLIfqL_oVwe32yAmZXU5UEHsahA0"
    }
}

```
This is env file for client

```json

# FOR GOOGLE OAUTH 2.0
REACT_APP_GOOGLE_CLIENT_ID ="578187234840-c9s8gdnukn5uc9764d1j3uoksgua4dqk.apps.googleusercontent.com"
REACT_APP_SERVER_ENDPOINT= "http://localhost:8081"
REACT_APP_PUBLIC_GOOGLE_OAUTH_REDIRECT_URL= "http://localhost:8081/api/oauth/google"

```
9.  This Is Landing Screen For Frontend
![image](https://github.com/maainul/rbac-client/assets/37740006/15795ed3-4ec4-427c-9e94-e398236f32e0)

10. After Clicking the Continue with Google then it will redirect the google consent screen
![image](https://github.com/maainul/rbac-client/assets/37740006/811766a1-53bf-4772-9b92-ab78c59b9ad4)

11. Get Google Auth URL :  

```js

const getGoogleOAuthURL = () => {
    const rootURL = process.env.REACT_APP_GOOGLE_OAUTH_ROOT_URL

    const options = {
        redirect_uri: process.env.REACT_APP_PUBLIC_GOOGLE_OAUTH_REDIRECT_URL,
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        access_type: 'offline',
        response_type: 'code',
        prompt: 'consent',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
        ].join(" "),
    }

    const qs = new URLSearchParams(options)
    return `${rootURL}?${qs.toString()}`
}

export default getGoogleOAuthURL

```

12. Create Routes For Backend :
```js
router.get('/oauth/google', controller.authCtrl.googleOAuthCtrl)
```
13. Create Function googleOAuthCtrl
```js

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
```

14. At LAST CHECK ENV FROM SERVER : .env
```env

# CLIENT CONFIG
# REACT_APP_API_URL = 'https://rbac-frontend.netlify.app'
REACT_APP_API_URL = 'http://localhost:3000'


# GOOGLE OAUTH API CONFIGS
GOOGLE_CLIENT_ID ="578187234840-c9s8gdnukn5uc9764d1j3uoksgua4dqk.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET ="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"
GOOGLE_OAUTH_REDIRECT_URI = "http://localhost:8081/api/v1/auth/oauth/google"

```

15. ENV FROM CLEINT:
```env
# REACT_APP_API_URL = 'https://rbac-4g20.onrender.com/api/'
REACT_APP_API_URL = 'http://localhost:8081/api/'

# FOR GOOGLE OAUTH 2.0
REACT_APP_GOOGLE_CLIENT_ID ="578187234840-c9s8gdnukn5uc9764d1j3uoksgua4dqk.apps.googleusercontent.com"
REACT_APP_SERVER_ENDPOINT= "http://localhost:8081"
REACT_APP_PUBLIC_GOOGLE_OAUTH_REDIRECT_URL= "http://localhost:8081/api/v1/auth/oauth/google"
REACT_APP_GOOGLE_OAUTH_ROOT_URL='https://accounts.google.com/o/oauth2/v2/auth'
```
![image](https://github.com/maainul/rbac-server/assets/37740006/fdedcd99-82e4-4415-aac6-85a7768afe08)

![image](https://github.com/maainul/rbac-server/assets/37740006/11a0e1f0-d5c1-4ea3-b81d-0f64fafe718b)

![image](https://github.com/maainul/rbac-server/assets/37740006/be3a114a-e0dc-412d-92b3-68f6b834022c)


1.  