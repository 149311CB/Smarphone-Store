import express from 'express'
// import {getOrders, getOrderById, getOrderDetail, createOrder, deleteOrder} from '../controllers/orderController.js'


/* router.route("/").get(getOrders).post(createOrder);

router.route("/:id").get(getOrderById).delete(deleteOrder);

router.route("/:id/detail").get(getOrderDetail)

export default router; */

import {getAllOrderByUserId, getOrderDetailByOrderId, createOrder} from '../controllers/orderController.js'
import protect from '../middlewares/authMiddlewares.js'

const router = express.Router()

router.route("/").get(protect, getAllOrderByUserId).post(protect, createOrder)
router.route("/details").get(protect, getOrderDetailByOrderId)


export default router
