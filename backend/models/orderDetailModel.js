import mongoose from 'mongoose'

const orderDetailSchema = mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Order'
  },
  spec: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Spec'
  },
  quantity: {
    type: Number,
    required: true
  },
  total: {
    type: Double,
    required: true
  },
})

const OrderDetail = mongoose.model('OrderDetail', orderDetailSchema);

export default OrderDetail;
