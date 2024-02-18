
import { Router } from 'express'
import { controller } from '../controllers/controller.js'


const router = Router()

// USER
router.put('/update/:id', controller.userCtrl.updateUserCtrl)
router.get('/list', controller.userCtrl.listUserCtrl)
router.get('/info', controller.userCtrl.getUserInfoCtrl)



export default router
