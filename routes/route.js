import { Router } from 'express'
import userRouter from './userRoutes.js'
import authRouter from './authRoutes.js'
import { adminMiddleware, authMiddleware } from './../middleware/authMiddleware.js';


const router = Router()


// USER
router.use('/user', userRouter)
// AUTH
router.use('/auth', authRouter)

// PROTECTED ROUTES (USER) : (PRIVATE ROUTE CONFIRM)
router.get('/auth/user-auth', authMiddleware, (req, res) => {
    res.status(200).send({ ok: true })
})


// PROTECTED ADMIN ROUTES : (PRIVATE ROUTE CONFIRM)
router.get('/auth/admin-auth', authMiddleware, adminMiddleware, (req, res) => {
    res.status(200).send({ ok: true })
})


export default router
