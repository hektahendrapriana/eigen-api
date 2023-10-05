const Borrow = require('../../models/borrow')
const { checkQueryString, getItems } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getBorrows = async (req, res) => {
  try {
    const query = await checkQueryString(req.query)

    if( typeof(req.query.status) !== 'undefined' )
    {
      query.status = req.query.status;
    }
    if( typeof(req.query.member_id) !== 'undefined' )
    {
      query.member_id = req.query.member_id;
    }
    if( typeof(req.query.book_id) !== 'undefined' )
    {
      query.book_id = req.query.book_id;
    }
    res.status(200).json(await getItems(req, Borrow, query, { path: 'member_id book_id', select: 'code name title author stock' }))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getBorrows }
