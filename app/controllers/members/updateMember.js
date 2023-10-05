const Member = require('../../models/member')
const { matchedData } = require('express-validator')
const { isIDGood, handleError } = require('../../middleware/utils')
const { updateItem } = require('../../middleware/db')

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateMember = async (req, res) => {
  try {
    req = matchedData(req)
    
    const updateData = req;
    const id = await isIDGood(updateData.id)
    res.status(200).json(await updateItem(id, Member, updateData))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { updateMember }
