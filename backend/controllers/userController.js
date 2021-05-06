import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

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

export {getUsers, getUserById, createUser}
