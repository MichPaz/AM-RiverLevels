const router = require('express').Router()
const controler = require('../controllers/dadosHidrometereologico')

router.get('/', controler.list)
router.get('/:id', controler.getById)

module.exports = router