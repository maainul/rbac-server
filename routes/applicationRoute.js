
import { Router } from 'express'
import { controller } from './../controllers/controller.js';


const router = Router()


router.post('/create', controller.applicationRouteCtrl.create)
router.get('/list', controller.applicationRouteCtrl.list)


export default router
