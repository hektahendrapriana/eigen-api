const Borrow = require('../../../models/borrow')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Gets all items from database
 */
const getAllItemsFromDB = () => {
  return new Promise((resolve, reject) => {
    Borrow.find(
      {},
      '-updatedAt -createdAt',
      {
        sort: {
          member_id: 1
        }
        
      },
      (err, items) => {
        if (err) {
          return reject(buildErrObject(203, err.message))
        }
        resolve(items)
      }
    ).populate('member_id book_id', 'code name title author stock')
  })
}

module.exports = { getAllItemsFromDB }
