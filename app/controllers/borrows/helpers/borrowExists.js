const Borrow = require('../../../models/borrow')
const { buildErrObject, handleError } = require('../../../middleware/utils')

/**
 * Checks if a city already exists in database
 * @param {string} member_id - member_id of item
 * @param {string} book_id - book_id of item
 */

const borrowExists = (member_id = '', book_id = '' ) => {
  return new Promise((resolve, reject) => {
    Borrow.findOne(
      {
        member_id, book_id
      },
    ).then((reseponse) => {
      // console.log('reseponse', reseponse)
      if( reseponse )
      {
        return reject(buildErrObject(203, 'BORROW_ALREADY_EXISTS'))
      }
      resolve(false);
      
    }).catch( (err) => {
      console.log(err)
      return reject(buildErrObject(203, 'ERROR'))
    })
  });
}

module.exports = { borrowExists }
