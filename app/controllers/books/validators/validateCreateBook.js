const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates create new item request
 */
const validateCreateBook = [
  check('code')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .trim(),
  check('title')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .trim(),
  check('author')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .trim(),
  check('stock')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .trim(),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateCreateBook }
