import asyncHandler from 'express-async-handler'
import Address from '../models/addressModel.js'
import User from '../models/userModel.js'
import generateToken from '../ultils/generateToken.js'

// @descs   Fetch all users
// @route   GET /api/users
// @access  Public
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

// @descs   Fetch user by id
// @route   GET /api/users/:id
// @access  Public
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.statu(404)
    res.json({message: "User not found"})
  }
  res.json(user)
})

// @descs   Create new user
// @route   POST /api/users/
// @access  Public
const createUser = asyncHandler(async (req, res) => {
  const user = await User.create(req.body);
  res.json(user)
})

// @descs   Delete user by id
// @route   DELETE /api/users/:id
// @access  Public
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    user.remove()
    await Address.deleteMany({user: user._id})
    await Order.deleteMany({user: user._id})
    res.json({message: 'User Removed'})
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

// @decs    Authenticate user
// @route   POST /api/users   
// @access  Private
const authUser = asyncHandler(async (req, res) => {
  const {email, password} = req.body;
  const user = await User.findOne({email})
  if (user && (user.matchPassword(password))) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastname: user.lastName,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    })
  } else {
    res.status(401)
    throw new Error("Invalid email or password")
  }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      email: user.email,
      gender: user.gender,
      birthday: user.birthday
    })
  } else {
    rest.status(404)
    throw new Error("User not found")
  }
})

// @desc    Register new user
// @route   POST /api/users/register
// @access  Private
const registerUser = asyncHandler(async (req, res) => {
  const {email} = req.body;

  const userExists = await User.findOne({email})

  if (userExists) {
    res.status(400)
    throw new Error("User already exists")
  }

  const today = new Date();
  const user = await User.create({
    ...req.body,
    role: "customer",
    createAt: today
  })
  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error("Invalid user data")
  }
})

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user && (user.matchPassword(req.body.password))) {
    user.firstName = req.body.firstName
    user.lastName = req.body.lastName
    user.email = req.body.email
    user.phoneNumber = req.body.phoneNumber
    user.gender = req.body.gender
  } else {
    res.status(401)
    throw new Error("Invalid email or password")
  }
  await user.save()
  res.json({message: "Update profile success"})
})

const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    user.firstName = req.body.firstName
    user.lastName = req.body.lastName
    user.email = req.body.email
    user.phoneNumber = req.body.phoneNumber
    user.gender = req.body.gender
  } else {
    res.status(404)
    res.json({message: "User not found"})
  }
  await user.save()
  res.json({message: "Update profile success"})

})

const getUserList = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    res.status(401)
    throw new Error("Not authorize, token failed")
  }
  const users = await User.find({})
  res.json(users)
})

export {
  getUsers, createUser, authUser, getUserProfile, registerUser,
  updateUserProfile, getUserList, deleteUser, getUserById, updateUserById
}
