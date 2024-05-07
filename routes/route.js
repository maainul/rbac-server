import { Router } from 'express'
import userRouter from './userRoutes.js'
import authRouter from './authRoutes.js'
import applicationRoute from './applicationRoute.js'

import { authMiddleware } from './../middleware/authMiddleware.js';


const router = Router()


// USER
router.use('/user', 
// authMiddleware, 
userRouter)

// Application Router
router.use('/application-route', authMiddleware, applicationRoute)

// AUTH
router.use('/auth', authRouter)


export default router
