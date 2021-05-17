import mongoose from 'mongoose'

const couponSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  discountType: {
    type: String,
    required: true
  },
  discountAmount: {
    type: Number,
    required: false
  },
  discountPercent: {
    type: Number,
    required: false
  },
  discountStart: {
    type: Date,
    required: true
  },
  activeTime: {
    type: Number,
    required: true
  },
  specs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Spec"
    }
  ],
  createAt: {
    type: Date,
    required: true
  }
})

const Coupon = mongoose.model('Coupon', couponSchema)

export default Coupon;
