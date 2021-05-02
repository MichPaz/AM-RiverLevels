const router = require('express').Router()
const controler = require('../controllers/estacao')

router.get('/', controler.list)
router.get('/:id', controler.getById)

module.exports = router