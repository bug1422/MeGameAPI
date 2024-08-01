const LocalStrategy = require('passport-local')
const crypto = require('crypto')
const UserModel = require('../models/BO/Account')
const { hashPassword } = require('../utils/hashing')

function initLocal(passport) {
    passport.use(new LocalStrategy({
        usernameField: "email"
    },
        async function verify(email, password, cb) {
            try {
                if (!email || !password) {
                    throw new Error('Missing credential')
                }
                const user = await UserModel.findOne({
                    Email: email,
                    HashedPassword: hashPassword(password)
                })
                if (user) {
                    cb(null, user)
                }
                else {
                    cb(null, null)
                }
            }
            catch (err) {
                cb(err, null)
            }
        }
    ))
    passport.serializeUser(function (user, cb) {
        process.nextTick(function () {
            cb(null, { id: user._id, username: user.UserName })
        })
    })

    passport.deserializeUser(function (user, cb) {
        process.nextTick(function () {
            return cb(null, user)
        })
    })
}

module.exports = initLocal

