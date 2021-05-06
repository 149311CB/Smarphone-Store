import asyncHandler from 'express-async-handler'
import Address from '../models/addressModel.js'

// @descs   Fetch all address
// @route   GET /api/addresses
// @access  Public
const getAddress = asyncHandler(async (req, res) => {
  const address = await Address.find({});
  res.json(address);
});

// @descs   Fetch address by id
// @route   GET /api/address/:id
// @access  Public
const getAddressById = asyncHandler(async (req, res) => {
  const address = await Address.findById(req.params.id);
  res.json(address);
});

// @descs   Create a address
// @route   POST /api/addresses
// @access  Public
const createAddress = asyncHandler(async (req, res) => {
  const address = await Address.create(req.body)
  res.status(201).json(address);
})

// @descs   Delete a address by id
// @route   DELETE /api/addresses
// @access  Public
const deleteAddressById = asyncHandler(async (req, res) => {
  const address = await Address.findById(req.params.id);
  if (address) {
    await address.remove()
    res.json({message: "Address removed"})
  } else {
    res.status(404)
    throw new Error('Address not found')
  }
})

export {getAddress, getAddressById, createAddress, deleteAddressById};
