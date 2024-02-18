
import { Router } from 'express'
import { controller } from './../controllers/controller.js';
import { authMiddleware } from './../middleware/authMiddleware.js';


const router = Router()


// AUTH
router.post('/signin', controller.authCtrl.signinCtrl)
router.post('/signup', controller.authCtrl.signupCtrl)
router.get('/get-current-user', authMiddleware, controller.authCtrl.currentUserCtrl)




export default router
