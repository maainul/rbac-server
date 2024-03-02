import { authCtrl } from './auth/authCtrl.js';
import { userCtrl } from './user/userCtrl.js';
import { googleOAuthCtrl } from './auth/googleOAuthCtrl.js';

import { applicationRouteCtrl } from './applicationRoute/applicationRouteCtrl.js';

export const controller = {
    authCtrl,
    userCtrl,
    applicationRouteCtrl,
    googleOAuthCtrl
}