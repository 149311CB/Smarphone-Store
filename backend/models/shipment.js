import mongoose from 'mongoose'

const shipmentSchema = mongoose.Schema({
  deliveryAddress: {
    type: String,
    required: true
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  fee: {
    type: Number,
    required: true
  }
})

const Shipment = mongoose.model("Shipment", shipmentSchema)

export default Shipment
