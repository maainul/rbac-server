
import { Router } from 'express'
import { controller } from './../controllers/controller.js';
import { authMiddleware, loggedIn } from './../middleware/authMiddleware.js';
import requireUser from '../middleware/requiredUser.js';


const router = Router()


// AUTH
router.post('/signin', controller.authCtrl.signinCtrl)
router.post('/signup', controller.authCtrl.signupCtrl)
router.get('/signout', controller.authCtrl.signoutCtrl)

// SESSIONS
router.post('/session', controller.authCtrl.createUserSessionCtrl)
router.get('/session', requireUser, controller.authCtrl.getUserSessionCtrl)
router.delete('/session', requireUser, controller.authCtrl.deleteUserSessionCtrl)

router.get("/logged-in", loggedIn)

// OAUTH
router.get('/get-current-user', authMiddleware, controller.authCtrl.currentUserCtrl)
router.get('/oauth/google', controller.authCtrl.googleOAuthCtrl)
router.get('/oauth/facebook', controller.authCtrl.facebookOAuthCtrl)



export default router
