import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
  status: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  shippingAddress: {
    type: String,
    required: true
  },
  shippingFee: {
    type: Number,
    required: true
  },
  gateway: {
    type: String,
    required: true
  },
  paidInfo: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  }
})

orderSchema.pre("deleteMany", function (next) {
  var order = this
  order.model("OrderDetail").deleteOne({order: order._id}, next)
})

const Order = mongoose.model('Order', orderSchema)

export default Order;
