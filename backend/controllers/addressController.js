import asyncHandler from 'express-async-handler'
import Address from '../models/addressModel.js'
import City from "../models/cityModel.js";

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
  if (!address) {
    res.status(404).json({message: "Address not found"})
  }
  res.json(address);
});

// @descs   Create a address
// @route   POST /api/addresses
// @access  Public
const createAddress = asyncHandler(async (req, res) => {
  const primaryAddrr = await Address.findOne({user: req.user._id, isPrimary: 1})
  if (primaryAddrr) {
    if (req.body.isPrimary === 1) {
      primaryAddrr.isPrimary = 0
    }
    const normalAddrr = await primaryAddrr.save()
  } else {
    req.body.isPrimary = 1
  }
  const address = await Address.create(req.body)
  res.status(201).json(address);
})

// @descs   Delete a address by id
// @route   DELETE /api/addresses
// @access  Public
const deleteAddressById = asyncHandler(async (req, res) => {
  const address = await Address.findById({user: req.user._id, _id: req.params.id});
  if (address) {
    await address.remove()
  } else {
    res.status(404)
    throw new Error('Address not found')
  }
  res.json({message: "Address removed"})
})

const getAddressesByUser = asyncHandler(async (req, res) => {
  const addresses = await Address.find({user: req.user._id})
  res.json(addresses)
})

const getPrimaryAddressByUserId = asyncHandler(async (req, res) => {
  const address = await Address.findOne({user: req.user._id, isPrimary: 1})
  res.json(address)
})

const addAddress = asyncHandler(async (req, res) => {
  const address = await Address.create({...req.body})
  res.json(address)
})

const updateAddress = asyncHandler(async (req, res) => {
  if (req.body.isPrimary === 1) {
    const primaryAddrr = await Address.findOne({user: req.user, isPrimary: 1})
    if (primaryAddrr) {
      primaryAddrr.isPrimary = 0
      const normalAddrr = await primaryAddrr.save()
    }
  }

  const address = await Address.findOne({_id: req.params.id, user: req.user._id})
  if (address) {
    address.city = req.body.city || address.city
    address.district = req.body.district || address.district
    address.ward = req.body.ward || address.ward
    address.addressDetails = req.body.addressDetails || address.addressDetails
    address.isPrimary = req.body.isPrimary || address.isPrimary
  } else {
    res.status(404)
    throw new Error('Address not found')
  }

  const updated = await address.save()
  res.json(updated)
})

const getCityList = asyncHandler(async (req, res) => {
  const cities = await City.find({})
  res.json(cities)
})


export {
  getAddress,
  getAddressById,
  createAddress,
  deleteAddressById,
  getPrimaryAddressByUserId,
  addAddress,
  getCityList,
  getAddressesByUser,
  updateAddress
};
