const mongoose = require('mongoose')
const Book = require('../../models/book')
const { checkQueryString, getItems } = require('../../middleware/db')
const { handleError, buildErrObject, itemNotFound } = require('../../middleware/utils')
const { resolveConfig } = require('prettier')
const { getAllItemsFromDB } = require('./helpers')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getAvailableBooks = async (req, res) => {
  try {
    const query = await checkQueryString(req.query)
    
    const items = await Book.find(
        {
            stock: { $gt: 0 }
        },
        '-updatedAt -createdAt',
        {
          sort: {
            title: 1
          }
          
        },
        (err, resp) => {
          if (err) {
            return reject(buildErrObject(203, err.message))
          }
          return resp
        }
    )

    res.status(200).json(items)
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getAvailableBooks }
