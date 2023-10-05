const Book = require('../../../models/book')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Checks if a city already exists excluding itself
 * @param {string} id - id of item
 * @param {string} code - code of item
 * @param {string} title - title of item
 * @param {string} author - author of item
 * @param {string} email - name of item
 */
const bookExistsExcludingItself = (id = '', code = '', title = '', author = '') => {
  return new Promise((resolve, reject) => {
    Book.findOne(
      {
        code,
        title,
        author,
        _id: {
          $ne: id
        }
      },
      (err, item) => {
        if (err) {
          return reject(buildErrObject(203, err.message))
        }

        if (item) {
          return reject(buildErrObject(203, 'BOOK_ALREADY_EXISTS'))
        }

        resolve(false)
      }
    )
  })
}

module.exports = { bookExistsExcludingItself }
