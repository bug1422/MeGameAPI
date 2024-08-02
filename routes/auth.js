const express = require('express')
const UserModel = require('../models/BO/Account');
const { hashPassword } = require('../utils/hashing');
const { createToken } = require('../authentication/jwt');
const router = express.Router();

router.get('/', async (req, res) => {
  try {

    res.json()
  }
  catch {
    res.status(500).json({});
  }
});
router.get('/login', (req, res) => {
  res.render('login', { message: req.flash('error',) })
})

router.get('/profile', (req, res) => {
  res.render('profile', { user: req.user })
})

router.get('/signup', (req, res) => {
  res.render('signup', { message: req.flash('error') })
})

// router.post('/login', passport.authenticate('local'), (req, res) => {
//     res.send(200)
// })

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await UserModel.findOneAndUpdate({ Email: email, HashedPassword: hashPassword(password) }, { LastLogin: Date.now() })
    if (!user) return res.status(400).json({ message: "Wrong email or password" })
    if (!user.IsActive) return res.status(403).json({ message: "Your account has been deactivated" })
    const accessToken = createToken(user)
    console.log('token got')
    return res.status(200).json({ message: "user logged in", accessToken: accessToken })
  }
  catch (err) {
    next(err)
  }
})

router.post('/logout', (req, res, next) => {
  req.logout()
  return res.status(204)
})

router.post('/signup', async (req, res) => {
  try {
    const { email, password, gender, userName } = req.body
    const existed = await UserModel.findOne({
      Email: email
    })
    if (existed) throw new Error("This email is already existed")
    const HashedPassword = hashPassword(password)
    var created = await UserModel.create({
      UserName: userName,
      Email: email,
      Gender: gender,
      HashedPassword: HashedPassword,
    })
    if (created) {
      const accessToken = createToken(created)
      return res.status(201).json({ message: "user logged in", accessToken: accessToken })
    }
  }
  catch (error) {
    console.log(error)
    return res.status(500).json({
      message: error.message
    })
  }
});

module.exports = router;
