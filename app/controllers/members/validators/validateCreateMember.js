const { validateResult } = require('../../../middleware/utils')
const validator = require('validator')
const { check } = require('express-validator')

/**
 * Validates create new item request
 */
const validateCreateMember = [
  check('code')
      .exists()
      .withMessage('MISSING')
      .not()
      .isEmpty()
      .withMessage('IS_EMPTY'),
  check('name')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  check('status'),
  (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateCreateMember }
