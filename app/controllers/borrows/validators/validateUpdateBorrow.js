const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates update item request
 */
const validateUpdateBorrow = [
  // check('status'),
  // check('returnDate'),
  // check('member_id')
  //   .exists()
  //   .withMessage('MISSING')
  //   .not()
  //   .isEmpty()
  //   .withMessage('IS_EMPTY'),
  // check('book_id')
  //   .exists()
  //   .withMessage('MISSING')
  //   .not()
  //   .isEmpty()
  //   .withMessage('IS_EMPTY'),
  check('id')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateUpdateBorrow }
