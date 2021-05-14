import express from 'express'
import {getOrders, getOrderById, getOrderDetail, createOrder, deleteOrder} from '../controllers/orderController.js'

const router = express.Router()

router.route("/").get(getOrders).post(createOrder);

router.route("/:id").get(getOrderById).delete(deleteOrder);

router.route("/:id/detail").get(getOrderDetail)

export default router;
