const { validateCreateMember } = require('./validateCreateMember')
const { validateDeleteMember } = require('./validateDeleteMember')
const { validateGetMember } = require('./validateGetMember')
const { validateUpdateMember } = require('./validateUpdateMember')

module.exports = {
  validateCreateMember,
  validateDeleteMember,
  validateGetMember,
  validateUpdateMember
}
