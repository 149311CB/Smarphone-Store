import express from 'express'
import {getAllOrderDetail} from '../controllers/orderDetailController.js'

const router = express.Router()

router.route("/").get(getAllOrderDetail)

export default router
