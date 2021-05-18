import express from 'express'
import {getCart, updateCart} from '../controllers/cartController.js'
import protect from '../middlewares/authMiddlewares.js'

const router = express.Router()

router.route("/").get(protect, getCart)
router.route("/").post(protect, updateCart)

export default router
