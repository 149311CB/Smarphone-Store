import mongoose from 'mongoose'

/* const citySchema = mongoose.Schema({
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
}) */

/* const citySchema = mongoose.Schema({
  Id: {
    type: String,
    required: false
  },
  Name: {
    type: String,
    required: true
  },
  Districts: [
    {
      Id: {
        type: String,
        required: true
      },
      Name: {
        type: String,
        required: true
      },
      Wards: [
        {
          Id: {
            type: String,
            required: true
          },
          Name: {
            type: String,
            required: true
          },
          Level: {
            type: String,
            required: true
          }
        }
      ]
    }
  ]
}) */

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
  ward: {
    type: String,
    required: true
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
  },
  createdAt: {
    type: Date,
    required: true
  }
})

const Address = mongoose.model("Address", addressSchema);

export default Address;
