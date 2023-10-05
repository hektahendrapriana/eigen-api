const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const BorrowSchema = new mongoose.Schema(
  {
    book_id: {
      type: String,
      ref: "Book"
    },
    member_id: {
      type: String,
      ref: "Member"
    },
    status: {
      type: String,
      enum: ['Borrow', 'Return'],
      default: 'Borrow',
      required: true
    },
    dueDate: {
        type: String,
        required: true
    },
    returnDate: {
        type: String,
        required: false
    },
  },
  {
    versionKey: false,
    timestamps: true
  }
)
BorrowSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Borrow', BorrowSchema)
