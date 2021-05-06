import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import OrderDetail from '../models/orderDetailModel.js'

// @descs   Fetch all orders
// @route   GET /api/orders
// @access  Public
const getOrders = asyncHandler(async (req, res) => {
  try {
    const orders = Order.find({})
    res.json(orders)
  } catch (error) {
    res.status(404).json({message: "Order is empty"})
  }
})

// @descs   Fetch order by Id
// @route   GET /api/orders/:id
// @access  Public
const getOrderById = asyncHandler(async (req, res) => {
  const order = Order.findById(req.params.id)
  res.json(order)
})

// @descs   Fetch order detail by order Id
// @route   GET /api/orders/:id
// @access  Public
const getOrderDetail = asyncHandler(async (req, res) => {
  const orderDetail = OrderDetail.find({})
    .where(d => d.order._id === req.params.id)
  if (orderDetail) {
    res.status(201).json(orderDetail)
  } else {
    res.status(404)
    throw new Error("Order detail not found")
  }
})

// @descs   Create new order
// @route   POST /api/orders
// @access  Public
const createOrder = asyncHandler(async (req, res) => {
  const order = Order.create(req.body)
  res.json(order)
})

// @descs   Delete order
// @route   DELETE /api/orders/:id
// @access  Public
const deleteOrder = asyncHandler(async (req, res) => {
  const order = Order.findById(req.params.id)
  if (order) {
    order.remove()
    res.status(201).json({message: "Order removed"})
  } else {
    res.status(404)
    throw new Error("Order not found")
  }
})

export {getOrders, getOrderById, getOrderDetail, createOrder, deleteOrder}
