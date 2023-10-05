const Borrow = require('../../models/borrow')
const Book = require('../../models/book')
const { createItem, getItem, getItems, checkQueryString } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { borrowExists, updateStock, checkUserStatus } = require('./helpers')
const moment = require('moment');

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createBorrow = async (req, res) => {
  try {
    const query = await checkQueryString(req.query)
    const request = matchedData(req)
    const createData = request;
    const checkUser = await checkUserStatus(createData.member_id);
    console.log('checkUser', checkUser)
    if( checkUser )
    {
      console.log('1')
      query.member_id = createData.member_id;
      query.status = 'Borrow';
      const borrowList = await getItems(req, Borrow, query, { path: 'member_id book_id', select: 'code name title author stock' });
      const totalDocs = await borrowList.totalDocs;
      if( Number(totalDocs) < 2 )
      {
        createData.dueDate = moment().add(7, 'd').format('YYYY-MM-DD');
        const doesBorrowExists = await borrowExists(createData.member_id, createData.book_id)
        console.log('doesBorrowExists', doesBorrowExists)
        if (!doesBorrowExists) {
          const bookDetails = await getItem(createData.book_id, Book, '', '');
          console.log('bookDetails', bookDetails)
          if( bookDetails.stock > 0 )
          {
            await updateStock(createData.book_id, -1);
            res.status(201).json(await createItem(createData, Borrow));
          }
          else
          {
            res.status(203).json({code: 203, msg: 'Stock tidak cukup', bookDetails});
          }
        }
      }
      else{
        res.status(203).json({code: 203, msg: 'Anda masih meminjam 2 buku.', borrowList});
      }
    }
    
  } catch (error) {
    console.log('3')
    handleError(res, error)
  }
}

module.exports = { createBorrow }
