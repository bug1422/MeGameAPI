const express = require("express")
const passport = require("../authentication/passport")
const router = express.Router()

router.use(passport.authenticate('jwt', { session: false }))

router.get('/', (req, res) => {
    return res.send("hello")
})

module.exports = router