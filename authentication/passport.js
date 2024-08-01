const passport = require('passport')
const initLocal = require('./local')
const initJwt = require('./jwt')

// initLocal(passport)
initJwt(passport)



module.exports = passport