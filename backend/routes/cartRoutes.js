import express from 'express'
import {getCart, updateCart, removeFromCart, deleteCart} from '../controllers/cartController.js'
import protect from '../middlewares/authMiddlewares.js'

const router = express.Router()

router.route("/").get(protect, getCart)
router.route("/").post(protect, updateCart)
router.route("/remove").post(protect, removeFromCart)
router.route("/:id").delete(protect, deleteCart)

export default router
