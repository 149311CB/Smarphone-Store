import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  birthday: {
    type: Date,
    required: true
  },
  gender: {
    type: Boolean,
    required: false
  },
  password: {
    type: String,
    required: true
  },
  createAt: {
    type: Date,
    required: true
  }
})

const User = mongoose.model("User", userSchema);

export default User;
