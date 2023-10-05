const mongoose = require('mongoose')
const validator = require('validator')
const mongoosePaginate = require('mongoose-paginate-v2')

const BookSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    stock: {
      type: Number,
      required: true
    },
  },
  {
    versionKey: false,
    timestamps: true
  }
)
BookSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Book', BookSchema)
