import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
  rating: {type: Number, required: true},
  comment: {type: String, required: false},
  user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"}
})

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  manufactor: {
    type: String,
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  backCam: {
    type: String,
    required: true,
  },
  frontCam: {
    type: String,
    required: true,
  },
  display: {
    type: String,
    required: true,
  },
  resolution: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  chipset: {
    type: String,
    required: true,
  },
  gpu: {
    type: String,
    required: true,
  },
  charger: {
    type: String,
    required: true,
  },
  battery: {
    type: String,
    required: true,
  },
  simNumber: {
    type: Number,
    required: true,
  },
  rom: {
    type: Number,
    required: true
  },
  ram: {
    type: Number,
    required: true
  },
  warranty: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Warranty'
  },
  reviews: [reviewSchema],
  price: {type: Number, required: true},
  images: [],
  countInStock: {
    type: Number,
    required: true
  },
  createAt: {
    type: Date,
    required: false
  }
});

const Spec = mongoose.model("Spec", productSchema);

export default Spec;
