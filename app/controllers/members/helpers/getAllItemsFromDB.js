const Member = require('../../../models/member')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Gets all items from database
 */
const getAllItemsFromDB = () => {
  return new Promise((resolve, reject) => {
    Member.find(
      {},
      '-updatedAt -createdAt',
      {
        sort: {
          code: 1
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
