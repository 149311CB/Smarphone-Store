import express from 'express'
import {getBanners} from '../controllers/ultilsControllers.js'

const router = express.Router()

router.route("/banners").get(getBanners)

export default router
