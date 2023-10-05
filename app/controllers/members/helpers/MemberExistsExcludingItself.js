const Member = require('../../../models/member')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Checks if a city already exists excluding itself
 * @param {string} id - id of item
 * @param {string} code - code of item
 * @param {string} name - name of item
 */
const memberExistsExcludingItself = (id = '', code = '', name = '') => {
  return new Promise((resolve, reject) => {
    Member.findOne(
      {
        code,
        name,
        _id: {
          $ne: id
        }
      },
      (err, item) => {
        if (err) {
          return reject(buildErrObject(203, err.message))
        }

        if (item) {
          return reject(buildErrObject(203, 'MEMBER_ALREADY_EXISTS'))
        }

        resolve(false)
      }
    )
  })
}

module.exports = { memberExistsExcludingItself }
