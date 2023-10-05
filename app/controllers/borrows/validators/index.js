const { validateCreateBorrow } = require('./validateCreateBorrow')
const { validateDeleteBorrow } = require('./validateDeleteBorrow')
const { validateGetBorrow } = require('./validateGetBorrow')
const { validateUpdateBorrow } = require('./validateUpdateBorrow')

module.exports = {
  validateCreateBorrow,
  validateDeleteBorrow,
  validateGetBorrow,
  validateUpdateBorrow
}
