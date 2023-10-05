const Book = require('../../models/book')
const { updateItem } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { bookExistsExcludingItself } = require('./helpers')
/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateBook = async (req, res) => {
  try {
    req = matchedData(req)

    const updateData = req;
    const id = await isIDGood(req.id)
    const doesBookExists = await bookExistsExcludingItself(id, updateData.code, updateData.title, updateData.author)
    if (!doesBookExists) {
      res.status(200).json(await updateItem(id, Book, updateData))
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { updateBook }
