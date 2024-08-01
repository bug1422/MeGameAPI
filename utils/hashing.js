const crypto = require('crypto')

const hashPassword = password => {
    return crypto.createHash('sha256').update(password).digest('hex')
}

const comparePassword = (pass, hashed) => {
    return hashPassword(pass) == hashed
}

module.exports = {
    hashPassword,
    comparePassword
}