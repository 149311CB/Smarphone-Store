import asyncHandler from 'express-async-handler'
import Banner from '../models/barnerModel.js'

// @descs   Fetch all banner
// @route   GET /api/ultils/banners
// @access  Public
const getBanners = asyncHandler(async (req, res) => {
  const banners = await Banner.find({})
  res.json(banners);
})

export {getBanners}
