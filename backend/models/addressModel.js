import mongoose from 'mongoose'

const citySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  }
})

const districtSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  city: [citySchema],
  createdAt: {
    type: Date,
    required: true
  }
})

const wardSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  district: [districtSchema],
  createdAt: {
    type: Date,
    required: true
  }
})

const addressSchema = mongoose.Schema({
  receiverFirstName: {
    type: String,
    required: true,
  },
  receiverLastName: {
    type: String,
    required: true,
  },
  city: [citySchema],
  district: [districtSchema],
  ward: [wardSchema],
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
  },
  createdAt: {
    type: Date,
    required: true
  }
})

const Address = mongoose.model("Address", addressSchema);

export default Address;
