const Book = require('../../models/book')
const { createItem } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { BookExists } = require('./helpers')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createBook = async (req, res) => {
  try {
    req = matchedData(req)
    const createData = req;
    
    const doesBookExists = await BookExists(createData.code, createData.title, createData.author)
    if (!doesBookExists) {
      res.status(201).json(await createItem(createData, Book))
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { createBook }
