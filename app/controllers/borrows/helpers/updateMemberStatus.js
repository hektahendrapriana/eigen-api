const Member = require('../../../models/member')
const { buildErrObject, handleError } = require('../../../middleware/utils')
const { updateItem } = require('../../../middleware/db')

/**
 * Checks if a city already exists in database
 * @param {string} member_id - member_id of item
 * @param {string} status - status of item
 */

const updateMemberStatus = ( member_id = '', status = '' ) => {
  return new Promise((resolve, reject) => {
    Member.findById(member_id).then(async (reseponse) => {
      console.log('reseponse', reseponse)
      if( reseponse )
      {
        const memberData = {
            code: reseponse.code,
            name: reseponse.name,
            status: status
          }
          resolve( await updateItem(member_id, Member, memberData));
      }
    }).catch( (err) => {
      console.log(err)
      return reject(buildErrObject(203, 'ERROR'))
    })
  });
}

module.exports = { updateMemberStatus }
