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
const getRatingsByValue = asyncHandler(async (req, res) => {
  const value = req.query.value;
  const ratings = await Rating.find({rating: value})
  res.json(ratings)
})

const getRatingsByProduct = asyncHandler(async (req, res) => {
  const ratings = await Rating.find({spec: req.params.id});
  res.json(ratings)
})

const createRating = asyncHandler(async(req,res) =>{
  const today = new Date().toISOString()
  const rating = await Rating.create({...req.body,user:req.user._id, createdAt:today })
  res.json(rating)
})

export {getBanners, getRatingsByValue, getRatingsByProduct, createRating}
