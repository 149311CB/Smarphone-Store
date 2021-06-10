import mongoose from 'mongoose'

const addressSchema = mongoose.Schema({
  city: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  ward: {
    type: String,
    required: true
  },
  addressDetails: {
    type: String,
    required: true
  },
  isPrimary: {
    type: Number,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    required: true
  }
})

const Address = mongoose.model("Address", addressSchema);

export default Address;
