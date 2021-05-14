import mongoose from 'mongoose'

const warrantySchema = mongoose.Schema({
  warrantyType: {
    type: String,
    required: true
  },
  time: {
    type: Number,
    required: true
  },
  createAt: {
    type: Date,
    required: true
  }
})

const Warranty = mongoose.model('Warranty', warrantySchema)

export default Warranty
