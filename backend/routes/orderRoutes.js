import express from 'express'
// import {getOrders, getOrderById, getOrderDetail, createOrder, deleteOrder} from '../controllers/orderController.js'


/* router.route("/").get(getOrders).post(createOrder);

router.route("/:id").get(getOrderById).delete(deleteOrder);

router.route("/:id/detail").get(getOrderDetail)

export default router; */

import {
    getAllOrderByUserId,
    getOrderDetailByOrderId,
    createOrder,
    getOrderDetailForRating
} from '../controllers/orderController.js'
import protect from '../middlewares/authMiddlewares.js'

const router = express.Router()

router.route("/").get(protect, getAllOrderByUserId).post(protect, createOrder)
router.route("/details").get(protect, getOrderDetailByOrderId)
router.route("/details/ratings").get(protect,getOrderDetailForRating)


export default router
