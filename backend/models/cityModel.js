import mongoose from 'mongoose'

const cityShema = mongoose.Schema({
  Id: {
    type: String,
    required: true
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
})

const City = mongoose.model('City', cityShema);

export default City;
