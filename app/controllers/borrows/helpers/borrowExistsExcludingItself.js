const Borrow = require('../../../models/borrow')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Checks if a city already exists excluding itself
 * @param {string} id - id of item
 * @param {string} member_id - member_id of item
 * @param {string} book_id - book_id of item
 */
const borrowExistsExcludingItself = (id = '', member_id = '', book_id = '') => {
  return new Promise((resolve, reject) => {
    Borrow.findOne(
      {
        member_id,
        book_id,
        _id: {
          $ne: id
        }
      },
      (err, item) => {
        if (err) {
          return reject(buildErrObject(203, err.message))
        }

        if (item) {
          console.log('item', item)
          return reject(buildErrObject(203, 'BORROW_ALREADY_EXISTS'))
        }

        resolve(false)
      }
    )
  })
}

module.exports = { borrowExistsExcludingItself }
