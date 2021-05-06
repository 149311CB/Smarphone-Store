import express from 'express'
import {getDiscounts, getDiscountById, createDiscount, deleteDiscount} from '../controllers/discountController.js'

const router = express.Router()

router.route("/").get(getDiscounts).post(createDiscount)
router.route("/:id").get(getDiscountById).delete(deleteDiscount)

export default router
