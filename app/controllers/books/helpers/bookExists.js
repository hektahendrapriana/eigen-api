const Book = require('../../../models/book')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Checks if a city already exists in database
 * @param {string} code - code of item
 * @param {string} title - title of item
 * @param {string} author - author of item
 */
const bookExists = (code = '', title = '', author = '') => {
  return new Promise((resolve, reject) => {
    Book.findOne(
      {
        code, title, author
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

module.exports = { bookExists }
