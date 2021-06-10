import express from 'express'
import {getBanners, getRatingsByValue, getRatingsByProduct, createRating} from '../controllers/ultilsControllers.js'

const router = express.Router()

router.route("/banners").get(getBanners)
router.route("/ratings").get(getRatingsByValue)
router.route("/ratings/").post(createRating)
router.route("/ratings/product/:id").get(getRatingsByProduct)

export default router
