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
})

const PaymentMethod = mongoose.model('PaymentMethod', paymentMethodSchema)

export default PaymentMethod;
