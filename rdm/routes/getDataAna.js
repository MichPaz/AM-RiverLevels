const router = require('express').Router()
const controler = require('../controllers/getDataAna')

router.get('/', controler.getData)

module.exports = router
