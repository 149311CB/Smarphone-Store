import asyncHandler from 'express-async-handler'
import City from '../models/cityModel.js'

// @descs   Fetch all city
// @route   GET /api/warranties
// @access  Public
const getCity = asyncHandler(async (req, res) => {
  const city = await City.find({});
  res.json(city);
});

// @descs   Fetch city by id
// @route   GET /api/city/:id
// @access  Public
const getCityById = asyncHandler(async (req, res) => {
  const city = await City.findById(req.params.id);
  res.json(city);
});

export {getCity, getCityById};
