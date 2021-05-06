import mongoose from 'mongoose'

const discoutnSchema = mongoose.Schema({
  discountType: {
    type: String,
    required: true
  },
  discountPercent: {
    type: Number,
    required: true
  },
  minPrice: {
    type: mongoose.Schema.Types.Decimal128,
    required: false
  },
  manufactor: [],
  paymentMethod: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'PaymentMethod'
  },
  discountStart: {
    type: Date,
    required: true
  },
  activeTime: {
    type: Number,
    required: true
  },
  createAt: {
    type: Date,
    required: true
  }
})

const Discount = mongoose.model('Discount', discoutnSchema)

export default Discount;
