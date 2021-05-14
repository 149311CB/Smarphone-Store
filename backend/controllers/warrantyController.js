import asyncHandler from 'express-async-handler'
import Warranty from '../models/warrantyModel.js'

// @descs   Fetch all warranty
// @route   GET /api/warranties
// @access  Public
const getWarranty = asyncHandler(async (req, res) => {
  const warranty = await Warranty.find({});
  res.json(warranty);
});

// @descs   Fetch warranty by id
// @route   GET /api/warranty/:id
// @access  Public
const getWarrantyById = asyncHandler(async (req, res) => {
  const warranty = await Warranty.findById(req.params.id);
  res.json(warranty);
});

// @descs   Create a warranty
// @route   POST /api/producs
// @access  Public
const createWarranty = asyncHandler(async (req, res) => {
  const warranty = await Warranty.create(req.body)
  res.status(201).json(warranty);
})

// @descs   Delete a warranty by id
// @route   DELETE /api/producs
// @access  Public
const deleteWarrantyById = asyncHandler(async (req, res) => {
  const warranty = await Warranty.findById(req.params.id);
  if (warranty) {
    await warranty.remove()
    res.json({message: "Warranty removed"})
  } else {
    res.status(404)
    throw new Error('Warranty not found')
  }
})

export {getWarranty, getWarrantyById, createWarranty, deleteWarrantyById};
