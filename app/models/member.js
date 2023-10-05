const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const mongoosePaginate = require('mongoose-paginate-v2')

const MemberSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['Active', 'Penalty'],
      default: 'Active',
      required: false
    },
  },
  {
    versionKey: false,
    timestamps: true
  }
)

MemberSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Member', MemberSchema)
