import express from 'express'
import {getBanners, getRatings} from '../controllers/ultilsControllers.js'

const router = express.Router()

router.route("/banners").get(getBanners)
router.route("/ratings").get(getRatings)

export default router
