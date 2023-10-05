const { createBook } = require('./createBook')
const { deleteBook } = require('./deleteBook')
const { getAllBooks } = require('./getAllBooks')
const { getBook } = require('./getBook')
const { getBooks } = require('./getBooks')
const { updateBook } = require('./updateBook')
const { updateStockBook } = require('./updateStockBook')
const { getAvailableBooks } = require('./getAvailableBooks')

module.exports = {
  createBook,
  deleteBook,
  getAllBooks,
  getBook,
  getBooks,
  updateBook,
  updateStockBook,
  getAvailableBooks
}
