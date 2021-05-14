import mongoose from 'mongoose'

const paymentMethodSchema = mongoose.Schema({
  paymentType: {
    type: String,
    required: true
  },
  provider: {
    type: String,
    required: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  createAt: {
    type: Date,
    required: true
  }
})

const PaymentMethod = mongoose.model('PaymentMethod', paymentMethodSchema)

export default PaymentMethod;
