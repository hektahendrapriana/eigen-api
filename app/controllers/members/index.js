const { createMember } = require('./createMember')
const { deleteMember } = require('./deleteMember')
const { getMember } = require('./getMember')
const { getMembers } = require('./getMembers')
const { getAllMembers } = require('./getAllMembers')
const { updateMember } = require('./updateMember')

module.exports = {
  getAllMembers,
  createMember,
  deleteMember,
  getMember,
  getMembers,
  updateMember
}
