const config = require('../config')
const { ExtractJwt, Strategy } = require("passport-jwt")
const UserModel = require('../models/BO/Account')
const jwt = require('jsonwebtoken')
const secret = config.passportSecret
function initJwt(passport) {
    passport.use(new Strategy(
        {
            jwtFromRequest: ExtractJwt.fromHeader('authorization'),
            secretOrKey: secret,
            issuer: config.issuer,
            audience: config.audience
        },
        async function (jwt, cb) {
            try {
                const user = await UserModel.findById(jwt.userId)
                if (user) {
                    return cb(null, user)
                }
                else {
                    throw new Error("No user found")
                }
            }
            catch (ex) {
                return cb(ex)
            }
        }
    ))
}

function createToken(user){
    return jwt.sign(
        {
            userId: user._id,
            userEmail: user.Email,
            iss: config.issuer,
            aud: config.audience
        },
        secret,
        {
            expiresIn: '1h'
        }
    )
}

module.exports = initJwt
module.exports.createToken = createToken

