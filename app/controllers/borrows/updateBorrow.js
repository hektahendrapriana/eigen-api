const Borrow = require('../../models/borrow')
const Member = require('../../models/member')
const { updateItem } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { borrowExistsExcludingItself, updateStock, updateMemberStatus } = require('./helpers')
const { getItem } = require('../../middleware/db')
const moment = require('moment');
/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateBorrow = async (req, res) => {
  try {
    var returnDate = moment();
    if(typeof(req.body.returnDate) !== 'undefined')
    {
      returnDate = moment(req.body.returnDate);
    }
    req = matchedData(req)
    var errorMsg = '';
    const updateData = req;
    
    const id = await isIDGood(req.id)
    updateData.status = 'Return';
    const details = await getItem(id, Borrow, 'member_id book_id', 'code name title author stock');
    console.log('details', details)
    updateData.member_id = details.member_id._id;
    updateData.book_id = details.book_id._id;
    updateData.dueDate = moment(details.dueDate).format('YYYY-MM-DD');
    updateData.returnDate = moment(returnDate).format('YYYY-MM-DD');

    if( moment(details.dueDate).diff(returnDate, 'days') < 0 )
    {
      errorMsg = 'Your Account got Penalty';
      console.log('errorMsg', errorMsg)
      await updateMemberStatus(updateData.member_id, 'Penalty');
    }
    await updateStock(updateData.book_id, 1);
    const resUpdate = await updateItem(id, Borrow, updateData);
    resUpdate.msg = errorMsg;
    res.status(200).json(resUpdate)
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { updateBorrow }
