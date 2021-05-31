import mongoose from 'mongoose'

const orderDetailSchema = mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Order'
  },
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Spec'
    },
    quantity: {
      type: Number,
      required: true
    }
  }]
})

const OrderDetail = mongoose.model('OrderDetail', orderDetailSchema);

export default OrderDetail;
