const { validateCreateBook } = require('./validateCreateBook')
const { validateDeleteBook } = require('./validateDeleteBook')
const { validateGetBook } = require('./validateGetBook')
const { validateUpdateBook } = require('./validateUpdateBook')
const { validateUpdateStockBook } = require('./validateUpdateStockBook')

module.exports = {
  validateCreateBook,
  validateDeleteBook,
  validateGetBook,
  validateUpdateBook,
  validateUpdateStockBook
}
