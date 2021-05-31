import asyncHandler from 'express-async-handler'
import OrderDetail from '../models/orderDetailModel.js'

const getAllOrderDetail = asyncHandler(async (req, res) => {
  const orderDetail = await OrderDetail.find({})
  res.json(orderDetail)
})

export {getAllOrderDetail}
