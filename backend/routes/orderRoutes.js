import express from 'express'

import {
  getAllOrderByUser,
  getOrderDetailByOrderId,
  createOrder,
  getOrderDetailForRating,
  updateOrder,
  getOrderList,
  deleteOrderById
} from '../controllers/orderController.js'
import protect from '../middlewares/authMiddlewares.js'

const router = express.Router()

router.route("/all").get(protect, getOrderList)
router.route("/").get(protect, getAllOrderByUser).post(protect, createOrder)
router.route("/details/ratings").get(protect, getOrderDetailForRating)
router.route("/:id")
  .get(protect, getOrderDetailByOrderId)
  .put(protect, updateOrder)
  .delete(protect, deleteOrderById)


export default router
