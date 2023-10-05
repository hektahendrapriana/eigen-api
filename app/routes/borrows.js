const express = require('express')
const router = express.Router()
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')

const {
  getAllBorrows,
  getBorrows,
  createBorrow,
  getBorrow,
  updateBorrow,
  deleteBorrow
} = require('../controllers/borrows')

const {
  validateCreateBorrow,
  validateGetBorrow,
  validateUpdateBorrow,
  validateDeleteBorrow
} = require('../controllers/borrows/validators')

/*
 * Cities routes
 */

/*
 * Get all items route
 */
router.get('/all', 
  trimRequest.all,
  getAllBorrows
)

/*
 * Get items route
 */
router.get(
  '/',
  trimRequest.all,
  getBorrows
)

/*
 * Create new item route
 */
router.post(
  '/',
  trimRequest.all,
  validateCreateBorrow,
  createBorrow
)

/*
 * Get item route
 */
router.get(
  '/:id',
  trimRequest.all,
  validateGetBorrow,
  getBorrow
)

/*
 * Update item route
 */
router.patch(
  '/:id',
  trimRequest.all,
  validateUpdateBorrow,
  updateBorrow
)

/*
 * Delete item route
 */
router.delete(
  '/:id',
  trimRequest.all,
  validateDeleteBorrow,
  deleteBorrow
)

module.exports = router
