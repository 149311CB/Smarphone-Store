import express from 'express'
import {
    getCart,
    removeFromCart,
    addToCart,
    updateQuantity,
    clearCart,
    pushToServer
} from '../controllers/cartController.js'
import protect from '../middlewares/authMiddlewares.js'

const router = express.Router()

router.route("/").get(protect, getCart)
router.route("/add").post(protect,addToCart)
router.route("/updateqty").post(protect,updateQuantity)
router.route("/remove").post(protect, removeFromCart)
router.route("/clear").post(protect,clearCart)
router.route("/pushcart").post(protect,pushToServer)

export default router
