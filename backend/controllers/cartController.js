import asyncHandler from 'express-async-handler'
import Cart from '../models/cartModel.js'

// @descs   Fetch cart by user
// @route   GET /api/carts
// @access  Private
const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({user: req.user._id})
    .populate({
      path: "products",
      populate: {
        path: "product", select: "name price images"
      }
    });
  res.json(cart)
})

// @descs   Add to cart
// @route   POST /api/carts
// @access  Private
const addToCart = asyncHandler(async (req, res) => {
  const today = new Date().toISOString()
  const cart = await Cart.findOne({user: req.user._id})
  if (!cart) {
    const createdCart = await Cart.create({products: [...req.body], user: req.user._id, createAt: today})
    res.json(createdCart)
  }
  let isNew = true
  cart.products.forEach(function (c) {
    // Don't change to ===
    if (c.product == req.body[0].product) {
      c.quantity += req.body[0].quantity
      isNew = false
    }
  })
  if (isNew) {
    cart.products.push(req.body[0])
  }
  const updatedCart = await cart.save()
  res.json(updatedCart)
})

// @desc    Update quantity
// @route   POST /api/carts/
// @access  Private
const updateQuantity = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({user: req.user._id})
  if (cart) {
    cart.products.forEach(function (c) {
      // Don't change to ===
      if (c.product == req.body.product) {
        c.quantity = req.body.quantity
      }
    })
  } else {
    res.status(404)
    throw new Error("Cart not found")
  }
  const updatedCart = await cart.save()
  res.json(updatedCart)
})

// @descs   Update cart by user
// @route   POST /api/carts
// @access  Private
const removeFromCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({user: req.user})
  if (cart) {
    cart.products.forEach(function (i) {
      if (i.product == req.body.product) {
        const index = cart.products.indexOf(i)
        cart.products.splice(index, 1)
      }
    })

    const removed = await cart.save()
    res.json(removed)
  }
})

const clearCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({user: req.user._id})
  if (!cart) {
    res.status(404)
    throw new Error('Order not found')
  }
  cart.products = []
  const updatedCart = cart.save()
  res.json({message: 'Clear cart'})
})

const pushToServer = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({user: req.user._id})
  const today = new Date().toISOString()
  if (!cart) {
    await Cart.create({products: [...req.body], user: req.user._id, createAt: today})
    res.json({message: "Push cart success"})
  }
  cart.products = req.body
  const updatedCart = await cart.save()
  res.json(updatedCart)
})
export {getCart, removeFromCart, clearCart, addToCart, updateQuantity, pushToServer}
