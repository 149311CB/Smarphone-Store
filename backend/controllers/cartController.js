import asyncHandler from 'express-async-handler'
import Cart from '../models/cartModel.js'

// @descs   Fetch cart by user
// @route   GET /api/carts
// @access  Private
const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({user: req.query.user})
    .populate({
      path: "products",
      populate: {
        path: "product", select: "name price images coupons",
        populate: {path: "coupons", select: "name discountType discountAmount discountPercent discountStart activeTime", model: "Coupon"}
      }
    });
  res.json(cart)
}
)

// @descs   Update cart by user
// @route   POST /api/carts
// @access  Private
const updateCart = asyncHandler(async (req, res) => {
  const today = new Date()
  const cart = await Cart.findOne({user: req.query.user})
  let isNew = true;
  if (cart) {
    console.log("update")
    cart.products.forEach(function (i) {
      if (i.product == req.body.product) {
        i.quantity += req.body.quantity
        isNew = false;
      }
    })
    if (isNew) {
      console.log("new")
      cart.products = [...cart.products, {...req.body}]
    }
    const updatedCart = await cart.save()
    res.json({...updatedCart._doc})
  } else {
    const created = await Cart.create({
      products: [...req.body],
      user: req.query.user,
      createAt: today.toISOString()
    })
    if (created) {
      res.json({...created._doc})
    }
  }
}
)

// @descs   Update cart by user
// @route   POST /api/carts
// @access  Private
const removeFromCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({user: req.query.user})
  if (cart) {
    cart.products.forEach(function (i) {
      if (i.product == req.body.product) {
        if (req.body.quantity) {
          i.quantity = req.body.quantity
        } else {
          const index = cart.products.indexOf(i)
          cart.products.splice(index, 1)
        }
      }
    })

    const removed = await cart.save()
    res.json({...removed._doc})
  }
})

export {getCart, updateCart, removeFromCart}
