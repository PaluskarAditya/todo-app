const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
  try {
    const token = req.header('token')
    if (!token) {
      res.json({ err: 'no token provided' })
    }
    const decode = jwt.decode(token, process.env.JWT_SECRET)
    if (!decode) {
      res.json({ err: 'invalid token' })
    } else {
      req.id = decode
    }
    next()
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = auth