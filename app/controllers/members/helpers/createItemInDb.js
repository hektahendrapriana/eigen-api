const uuid = require('uuid')
const Member = require('../../../models/member')
const { buildErrObject } = require('../../../middleware/utils')
const moment = require('moment')
/**
 * Creates a new item in database
 * @param {Object} req - request object
 */
const createItemInDb = ({
  code = '',
  name = '',
}) => {
  return new Promise((resolve, reject) => {

    const [day, month, year] =  date_of_birth.split('-')
    date_of_birth = `${year}-${month}-${day}`
    mobile_phone = '+62' + formatMobilePhone(mobile_phone)
    phone_number = formatPhonetoSave(phone_number)

    const Member = new Member({
      code,
      name,
    })
    console.log(Member);
    Member.save((err, item) => {
      console.log(err)
      console.log(item)
      if (err) {
        reject(buildErrObject(203, err.message))
      }
      item = JSON.parse(JSON.stringify(item))

      resolve(item)
    })
  })
}

module.exports = { createItemInDb }
