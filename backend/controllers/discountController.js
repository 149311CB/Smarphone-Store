import asyncHandler from 'express-async-handler'
import Coupon from '../models/discountModel.js'

// @descs   Fetch all discount
// @route   GET /api/discounts
// @access  Public
const getDiscounts = asyncHandler(async (req, res) => {
  try {
    const discount = await Coupon.find({})
    res.json(discount)
  } catch (error) {
    res.json(error)
  }
})

// @descs   Fetch discount by id
// @route   GET /api/discounts/:id
// @access  Public
const getDiscountById = asyncHandler(async (req, res) => {
  const discount = await Coupon.findById(req.params.id)
  if (discount) {
    res.status(201).json(discount)
  } else {
    res.status(404)
    throw new Error("Discount not found")
  }
})

// @descs   Create discount
// @route   POST /api/discounts
// @access  Public
const createDiscount = asyncHandler(async (req, res) => {
  const discount = await Coupon.create(req.body)
  res.status(201).json(discount)
})

// @descs   Create discount
// @route   POST /api/discounts
// @access  Public
const deleteDiscount = asyncHandler(async (req, res) => {
  const discount = await Coupon.findById(req.params.id)
  if (discount) {
    discount.remove()
    res.status(201).json({message: "Discount removed"})
  } else {
    res.status(404)
    throw new Error("Discount not found")
  }
})

export {getDiscounts, getDiscountById, createDiscount, deleteDiscount}
