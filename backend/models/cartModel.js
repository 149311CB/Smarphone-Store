import mongoose from 'mongoose'

const cartDetailSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Spec",
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
}, {_id: false})

const cartSchema = mongoose.Schema({
  products: [cartDetailSchema],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  createAt: {
    type: Date,
    required: true
  }
})

const Cart = mongoose.model("Cart", cartSchema)

export default Cart;
