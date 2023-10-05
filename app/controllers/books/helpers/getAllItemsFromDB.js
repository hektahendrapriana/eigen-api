const Book = require('../../../models/book')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Gets all items from database
 */
const getAllItemsFromDB = () => {
  return new Promise((resolve, reject) => {
    Book.find(
      {},
      '-updatedAt -createdAt',
      {
        sort: {
          title: 1
        }
        
      },
      (err, items) => {
        if (err) {
          return reject(buildErrObject(203, err.message))
        }
        resolve(items)
      }
    )
  })
}

module.exports = { getAllItemsFromDB }
