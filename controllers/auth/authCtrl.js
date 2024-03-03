
import { signinCtrl } from './signinCtrl.js';
import { signupCtrl } from './signupCtrl.js';
import { signoutCtrl } from './signoutCtrl.js';
import { currentUserCtrl } from './currentUserCtrl.js';
import { googleOAuthCtrl } from './googleOAuthCtrl.js';
import { facebookOAuthCtrl } from './facebookOAuthCtrl.js';
import { createUserSessionCtrl } from './session/createUserSessionCtrl.js';
import { getUserSessionCtrl } from './session/getUserSessionCtrl.js';
import { deleteUserSessionCtrl } from './session/deleteUserSessionCtrl.js';

export const authCtrl = {
    // AUTH
    signinCtrl,
    signupCtrl,
    signoutCtrl,
    currentUserCtrl,
    // OAUTH
    googleOAuthCtrl,
    facebookOAuthCtrl,

    // SESSIONS
    createUserSessionCtrl,
    getUserSessionCtrl,
    deleteUserSessionCtrl
}
