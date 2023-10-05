const Member = require('../../../models/member')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Checks if a city already exists in database
 * @param {string} code - code of item
 * @param {string} name - name of item
 */
const memberExists = (code = '', name = '') => {
  return new Promise((resolve, reject) => {
    Member.findOne(
      {
        code, name
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

module.exports = { memberExists }
