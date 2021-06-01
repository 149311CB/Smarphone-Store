import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import OrderDetail from '../models/orderDetailModel.js'

const getAllOrderByUserId = asyncHandler(async (req, res) => {
  const order = await Order.find({user: req.query.user})
  res.json(order)
})

const getOrderDetailByOrderId = asyncHandler(async (req, res) => {
  const orderDetail = await OrderDetail.find({order: req.query.order})
  res.json(orderDetail)
})

const createOrder = asyncHandler(async (req, res) => {
  const order = await Order.create({...req.body.order, user: req.user})
  const orderDetails = await OrderDetail.create({...req.body.details, order: order._id})
  res.json({...order._doc, ...orderDetails._doc})
})

const getOrderDetailForRating=asyncHandler(async (req,res) =>{
  const orderDetails = await OrderDetail.find({"products.product":{$in:req.params.product}})
      .populate({ path:"order", match:{user:req.user._id}})
  console.log(orderDetails)
    const userOders = []
  orderDetails.forEach(function(od){
    if(od.order!=null){
      userOders.push(od)
    }
  })
    console.log(userOders)
  res.json(userOders)
})

export {getAllOrderByUserId, getOrderDetailByOrderId, createOrder, getOrderDetailForRating}
