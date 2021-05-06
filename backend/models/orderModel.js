import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
  subTotal: {
    type: mongoose.Schema.Types.Decimal128,
    required: true
  },
  status: {
    type: String,
    required: true
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
  createAt: {
    type: Date,
    required: true
  }
})

const Order = mongoose.model('Order', orderSchema)

export default Order;
