import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import OrderDetail from '../models/orderDetailModel.js'

const getAllOrderByUser = asyncHandler(async (req, res) => {
  const orderDetails = await OrderDetail.find({})
    .populate({path: "products.product", select: "name price"})
    .populate({path: "order", match: {user: req.user._id}})
  const userOders = []
  orderDetails.forEach(function (od) {
    if (od.order != null) {
      userOders.push(od)
    }
  })
  res.json(userOders)
})

const getOrderDetailByOrderId = asyncHandler(async (req, res) => {
  const orderDetail = await OrderDetail.findOne({order: req.params.id})
    .populate({path: "products.product"})
    .populate("order")
  res.json(orderDetail)
})

const createOrder = asyncHandler(async (req, res) => {
  const order = await Order.create({...req.body.order, user: req.user})
  const orderDetails = await OrderDetail.create({...req.body.details, order: order._id})
  res.json({...order._doc, ...orderDetails._doc})
})

const getOrderDetailForRating = asyncHandler(async (req, res) => {
  const orderDetails = await OrderDetail.find({"products.product": {$in: req.params.product}})
    .populate({path: "order", match: {user: req.user._id}})
  const userOders = []
  orderDetails.forEach(function (od) {
    if (od.order != null) {
      userOders.push(od)
    }
  })
  console.log(userOders)
  res.json(userOders)
})

const updateOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.json({message: "Order not found"})
  }
  order.status = req.body.status
  await order.save()
  res.json({message: `Order ${order.status}`})
})

const getOrderList = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    res.status(401)
    throw new Error("Not authorize, token failed")
  }

  const orderDetails = await OrderDetail.find({})
    .populate({path: "products.product", select: "name price"})
    .populate({path: "order", populate: {path: "user"}}).sort({'createdAt': 'desc'})

  res.json(orderDetails)
})

const deleteOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id)
  if (!order) {
    res.status(404)
    res.json({message: "Order not found"})
  }
  await OrderDetail.findOneAndDelete({order: req.params.id})
  res.json({message: "Order removed"})
})

export {
  getAllOrderByUser, getOrderDetailByOrderId, createOrder,
  getOrderDetailForRating, updateOrder, getOrderList,
  deleteOrderById
}
