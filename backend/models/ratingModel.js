import mongoose from 'mongoose'

const ratingSchema = mongoose.Schema({
  rating: {
    type: mongoose.Schema.Types.Decimal128,
    required: true
  },
  comment: {
    type: String,
    required: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  spec: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Spec",
    required: true
  },
  createAt: {
    type: Date,
    required: true
  }

})

const Rating = mongoose.model('Rating', ratingSchema);

export default Rating;
