import mongoose from 'mongoose'

const ratingSchema = mongoose.Schema({
  rating: {
    type: Double,
    required: true
  },
  comment: {
    type: String,
    required: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  spec: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  createAt: {
    type: Date,
    required: true
  }

})

const Rating = mongoose.model('Rating', ratingSchema);

export default Rating;
