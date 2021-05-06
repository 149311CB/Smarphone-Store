import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
  SubTotal: {
    type: Double,
    required: true
  },
  paymentMethod: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'paymentMethod'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Address'
  },
  isPaid: {
    type: Boolean,
    required: true
  },
  paidAt: {
    type: Date,
    required: false
  },
  createAt: {
    type: Date,
    required: true
  }
})

const Order = mongoose.model('Order', orderSchema)

export default Order;
