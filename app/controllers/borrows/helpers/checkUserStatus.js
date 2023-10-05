const Member = require('../../../models/member')
const Borrow = require('../../../models/borrow')
const { buildErrObject, handleError } = require('../../../middleware/utils');
const { updateItem } = require('../../../middleware/db')
const { updateMemberStatus } = require('./updateMemberStatus')
const moment = require('moment');

/**
 * Checks if a city already exists in database
 * @param {string} member_id - member_id of item
 */

const checkUserStatus = (member_id = '') => {
    return new Promise((resolve, reject) => {
        Member.findById(member_id, async (err, item) => {
            try {
                if( err )
                {
                    return reject(buildErrObject(203, 'ERROR'))
                }

                if(item.status === 'Active')
                {
                    resolve(true);
                }
                else
                {
                    Borrow.findOne(
                        {
                          member_id
                        }, async (errorResp, reseponse) => {
                            try {
                                if(errorResp)
                                {
                                    return reject(buildErrObject(203, 'ERROR'))
                                }

                                if( reseponse )
                                {
                                    const dateNow = moment('2023-10-17');
                                    if( dateNow.diff(moment(reseponse.returnDate), 'days') >= 3 )
                                    {
                                        const memberData = {
                                            code: item.code,
                                            name: item.name,
                                            status: 'Active'
                                        }
                                        await updateItem(member_id, Member, memberData)
                                        resolve(true);
                                    }
                                    else
                                    {
                                        return reject(buildErrObject(203, 'USER_PENALTY'))
                                    }
                                }
                                else
                                {
                                    return reject(buildErrObject(203, 'USER_PENALTY'))
                                }

                            } catch (errors) {
                                return reject(errors)
                            }
                    })
                }
            } catch (error) {
                return reject(error)
            }
        })
  });
}

module.exports = { checkUserStatus }
