
import { signinCtrl } from './signinCtrl.js';
import { signupCtrl } from './signupCtrl.js';
import { signoutCtrl } from './signoutCtrl.js';
import { getCurrentUserCtrl } from './getCurrentUserCtrl.js';

import {googleOAuthCtrl} from './oAuth/googleOAuthCtrl.js'
import {facebookOAuthCtrl} from './oAuth/facebookOAuthCtrl.js'

import { createUserSessionCtrl } from './session/createUserSessionCtrl.js';
import { getUserSessionCtrl } from './session/getUserSessionCtrl.js';
import { deleteUserSessionCtrl } from './session/deleteUserSessionCtrl.js';

export const authCtrl = {

    // AUTH
    signinCtrl,
    signupCtrl,
    signoutCtrl,
    getCurrentUserCtrl,
    
    // OAUTH
    googleOAuthCtrl,
    facebookOAuthCtrl,

    // SESSIONS
    createUserSessionCtrl,
    getUserSessionCtrl,
    deleteUserSessionCtrl
}
