import asyncHandler from 'express-async-handler'
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
      name: user.firstName + " " + user.lastName,
      email: user.email,
      role: user.role
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
  console.log(user)
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


export {getUsers, getUserById, createUser, authUser, getUserProfile, registerUser }
