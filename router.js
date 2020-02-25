const router = require('express').Router()
const game = require('./routes/game')
const player = require('./routes/player')

router.use('/games', game)
router.use('/players', player)

module.exports = router