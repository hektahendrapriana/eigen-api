const express = require('express')
const router = express.Router()
require('../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')

const {
  getAllMembers,
  getMembers,
  createMember,
  getMember,
  updateMember,
  deleteMember
} = require('../controllers/members')

const {
  validateCreateMember,
  validateGetMember,
  validateUpdateMember,
  validateDeleteMember
} = require('../controllers/members/validators')

/*
 * Members routes
 */

/*
 * Get all items route
 */
router.get('/all', 
  trimRequest.all,
  getAllMembers
)

/*
 * Get items route
 */
router.get(
  '/',
  trimRequest.all,
  getMembers
)

/*
 * Create new item route
 */
router.post(
  '/',
  trimRequest.all,
  validateCreateMember,
  createMember
)

/*
 * Get item route
 */
router.get(
  '/:id',
  trimRequest.all,
  validateGetMember,
  getMember
)

/*
 * Update item route
 */
router.patch(
  '/:id',
  trimRequest.all,
  validateUpdateMember,
  updateMember
)

/*
 * Delete item route
 */
router.delete(
  '/:id',
  trimRequest.all,
  validateDeleteMember,
  deleteMember
)

module.exports = router
