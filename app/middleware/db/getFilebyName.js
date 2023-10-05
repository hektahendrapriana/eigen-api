const { itemNotFound } = require('../../middleware/utils')

/**
 * Gets item from database by id
 * @param {string} id - item id
 */
const getFilebyName = (filename = '', model = {}) => {
  return new Promise((resolve, reject) => {
    model.findOne({ filename: filename }, async (err, item) => {
      try {
        await itemNotFound(err, item, 'NOT_FOUND')
        resolve(item)
      } catch (error) {
        reject(error)
      }
    })
  })
}

module.exports = { getFilebyName }
