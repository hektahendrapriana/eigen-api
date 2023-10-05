const express = require('express')
const router = express.Router()
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')

const {
  getAvailableBooks,
  getAllBooks,
  getBooks,
  createBook,
  getBook,
  updateBook,
  deleteBook,
  updateStockBook
} = require('../controllers/books')

const {
  validateCreateBook,
  validateGetBook,
  validateUpdateBook,
  validateDeleteBook,
  validateUpdateStockBook
} = require('../controllers/books/validators')

/*
 * Cities routes
 */

/*
 * Get all items route
 */
router.get('/all', 
  trimRequest.all,
  getAllBooks
)
/*
 * Get all items route
 */
router.get('/available', 
  trimRequest.all,
  getAvailableBooks
)

/*
 * Get items route
 */
router.get(
  '/',
  trimRequest.all,
  getBooks
)

/*
 * Create new item route
 */
router.post(
  '/',
  trimRequest.all,
  validateCreateBook,
  createBook
)

/*
 * Get item route
 */
router.get(
  '/:id',
  trimRequest.all,
  validateGetBook,
  getBook
)

/*
 * Update item route
 */
router.patch(
  '/:id',
  trimRequest.all,
  validateUpdateBook,
  updateBook
)
/*
 * Update item route
 */
router.patch(
  'updatestock/:id',
  trimRequest.all,
  validateUpdateStockBook,
  updateStockBook
)

/*
 * Delete item route
 */
router.delete(
  '/:id',
  trimRequest.all,
  validateDeleteBook,
  deleteBook
)

module.exports = router
