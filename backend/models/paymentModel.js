import mongoose from 'mongoose'

const paymentSchema = mongoose.Schema({
  paymentMethod: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'PaymentMethod'
  },
  paymentAmount: {
    type: Double,
    required: true
  },
  paymentAt: {
    type: Date,
    required: true
  }
})

const Payment = mongoose.model('Payment', paymentSchema)

export default Payment;
