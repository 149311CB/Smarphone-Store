import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
  subTotal: {
    type: Double,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  payment: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Payment'
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
