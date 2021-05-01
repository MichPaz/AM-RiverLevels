const router = require('express').Router()
const controler = require('../controllers/populate')

router.get('/', controler.populateByData)

module.exports = router
