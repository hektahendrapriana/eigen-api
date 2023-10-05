const express = require('express')
const router = express.Router()
const fs = require('fs')
const routesPath = `${__dirname}/`
const { removeExtensionFromFile } = require('../middleware/utils')

// router.use('/eigen-api/', require('./auth'))

fs.readdirSync(routesPath).filter((file) => {
  const routeFile = removeExtensionFromFile(file)
  return routeFile !== 'index' && routeFile !== 'auth' && file !== '.DS_Store'
    ? router.use(`/eigen-api/${routeFile}`, require(`./${routeFile}`))
    : ''
})

router.get('/eigen-api/', (req, res) => {
  res.render('index')
})

router.use('*', (req, res) => {
  res.status(404).json({
    errors: {
      msg: 'URL_NOT_FOUND'
    }
  })
})

module.exports = router
