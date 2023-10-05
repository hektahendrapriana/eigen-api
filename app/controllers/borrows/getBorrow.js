const { matchedData } = require('express-validator')
const Borrow = require('../../models/borrow')
const { getItem } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getBorrow = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)
    res.status(200).json(await getItem(id, Borrow, 'mamber_id book_id', 'code name title author stock'))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getBorrow }
