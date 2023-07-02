const User = require("../models/userModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const token = (id) => {
  return jwt.sign(id, process.env.JWT_SECRET)
}

const login = async (req, res) => {
  try {
    const { uname, pass } = req.body
    if (!uname || !pass) {
      res.json({ err: 'please fill all fields' })
    }
    const usr = await User.findOne({ username: uname })
    if (!usr) {
      res.json({err: 'user not found'})
    } else if (usr && await bcrypt.compare(pass, usr.password)) {
      res.json({ success: 'logged in', user: usr, token: token(usr.id) })
    } else if (await bcrypt.compare(pass, usr.password) !== true) {
      res.json({err: 'invalid data'})
    }
  } catch (error) {
    console.log(error.message)
  }
}

const register = async (req, res) => {
  try {
    const { email, uname, pass } = req.body
    if (!uname || !pass || !email) {
      res.json({ err: 'please fill all fields' })
    } else {
      const salt = await bcrypt.genSalt(10)
      const hashed = await bcrypt.hash(pass, salt)
      const user = await User({
        username: uname, 
        email, 
        password: hashed,
      })
      user.save()
      user?res.json({user: user, token: token(user.id)}):res.json({err: 'please try again'})

    }
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = {
  login, 
  register,
}