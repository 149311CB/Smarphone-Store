import mongoose from 'mongoose'

const addressSchema = mongoose.Schema({
  receiverFirstName: {
    type: String,
    required: true,
  },
  receiverLastName: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  subDistrict: {
    type: String,
    required: true,
  },
  addressDetails: {
    type: String,
    required: true
  },
  addressType: {
    type: String,
    required: false
  },
  isPrimary: {
    type: Boolean,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
})

const Address = mongoose.model("Address", addressSchema);

export default Address;
