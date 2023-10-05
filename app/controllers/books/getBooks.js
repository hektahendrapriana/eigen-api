const mongoose = require('mongoose')
const Book = require('../../models/book')
const { checkQueryString, getItems } = require('../../middleware/db')
const { handleError, buildErrObject, itemNotFound } = require('../../middleware/utils')
const { resolveConfig } = require('prettier')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getBooks = async (req, res) => {
  try {
    const query = await checkQueryString(req.query)
    
    const items = await getItems(req, Book, query, { path: '', select: '' } )
   
    res.status(200).json(items)
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getBooks }
