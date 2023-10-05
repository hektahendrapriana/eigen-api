const Member = require('../../models/member')
const { createItem } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { memberExists } = require('./helpers')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createMember = async (req, res) => {
  try {
    req = matchedData(req)
    // console.log('req', req);
    const createData = req;
    
    const doesMemberExists = await memberExists(createData.code, createData.name)
    if (!doesMemberExists) {
      res.status(201).json(await createItem(createData, Member))
    }
  } catch (error) {
    handleError(res, error)
  }
}


module.exports = { createMember }
