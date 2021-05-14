import asyncHandler from 'express-async-handler'
import Banner from '../models/barnerModel.js'
import Rating from '../models/ratingModel.js'

// @descs   Fetch all banner
// @route   GET /api/ultils/banners
// @access  Public
const getBanners = asyncHandler(async (req, res) => {
  const banners = await Banner.find({})
  res.json(banners);
})

// @descs   Fetch all banner
// @route   GET /api/ultils/banners
// @access  Public
const getRatings = asyncHandler(async (req, res) => {
  const value = req.query.value;
  const ratings = await Rating.find({rating: value})
  res.json(ratings)
})

export {getBanners, getRatings}
