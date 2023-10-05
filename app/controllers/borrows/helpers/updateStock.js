const Book = require('../../../models/book')
const { buildErrObject, handleError } = require('../../../middleware/utils')
const { updateItem } = require('../../../middleware/db')

/**
 * Checks if a city already exists in database
 * @param {string} book_id - book_id of item
 * @param {string} stock - stock of item
 */

const updateStock = ( book_id = '', stock = '' ) => {
  return new Promise((resolve, reject) => {
    Book.findById(book_id).then(async (reseponse) => {
      if( reseponse )
      {
        const book = {
            code: reseponse.code,
            title: reseponse.title,
            author: reseponse.author,
            stock: reseponse.stock + stock 
          }
          resolve( await updateItem(book_id, Book, book));
      }
    }).catch( (err) => {
      console.log(err)
      return reject(buildErrObject(203, 'ERROR'))
    })
  });
}

module.exports = { updateStock }
