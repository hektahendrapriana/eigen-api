const { buildErrObject } = require('./buildErrObject')
const { buildSuccObject } = require('./buildSuccObject')
const { getBrowserInfo } = require('./getBrowserInfo')
const { getIP } = require('./getIP')
const { handleError } = require('./handleError')
const { isIDGood } = require('./isIDGood')
const { itemNotFound } = require('./itemNotFound')
const { removeExtensionFromFile } = require('./removeExtensionFromFile')
const { validateResult } = require('./validateResult')

module.exports = {
  buildErrObject,
  buildSuccObject,
  getBrowserInfo,
  getIP,
  handleError,
  isIDGood,
  itemNotFound,
  removeExtensionFromFile,
  validateResult
}
