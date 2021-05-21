import express from 'express'
import {getCart, updateCart, removeFromCart} from '../controllers/cartController.js'
import protect from '../middlewares/authMiddlewares.js'

const router = express.Router()

router.route("/").get(protect, getCart)
router.route("/").post(protect, updateCart)
router.route("/remove").post(protect, removeFromCart)

export default router
