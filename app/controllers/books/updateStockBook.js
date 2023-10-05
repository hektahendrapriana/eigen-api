const Book = require('../../models/book')
const { updateItem } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateStockBook = async (req, res) => {
  try {
    req = matchedData(req)

    const updateData = req;
    
    const id = await isIDGood(req.id)
    res.status(200).json(await updateItem(id, Book, updateData))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { updateStockBook }
