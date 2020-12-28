//Node modules
const jwt = require('jsonwebtoken') // generate signed token

//My import
const User = require('../models/user')

// User Register
exports.signup = async (req, res) => {
  const findUser = await User.findOne({ email: req.body.email })
  if (findUser) {
    return res.status(400).json({ error: '"email" is already taken' })
  }

  const user = new User(req.body)
  user.save((err, user) => {
    if (err) return res.status(400).json({ error: err })
    user.hashed_password = undefined
    user.salt = undefined
    return res.json({ user })
  })
}

// User Login
exports.signin = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'We have not find a user with this email. Please signup',
      })
    }

    // If user is founded make sure email and password match
    if (!user.authentificate(password)) {
      return res.status(401).json({ error: 'Email and password dont match' })
    }
    // Generate a signed token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)

    // Persist token in cookie
    res.cookie('Login Token', token, {
      expires: new Date(Date.now() + 9999),
      httpOnly: true,
    })

    // Send token and user
    const { _id, name, email, role } = user
    return res.json({ token, user: { _id, name, email, role } })
  })
}

// User Logout
exports.signout = (req, res) => {
  try {
    res.clearCookie('Login Token')
    return res.json({ message: 'Logout success' })
  } catch (error) {
    return res
      .status(400)
      .json({ errror: 'Something want wrong. Try again or contact assistance' })
  }
}

// Require signin to access on some pages
exports.requireSignin = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.headers['authorization']
  // Check if token exist
  if (!token)
    return res.status(401).json({ error: 'Acces denied. No token proveded' })

  try {
    //if a token exist, check if it valid and set req.auth and pass to the next
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.auth = decoded
    next()
  } catch (err) {
    return res.status(400).json({ error: 'Invalid token' })
  }
}

// Check if the user is authentificate / login
exports.isAuth = (req, res, next) => {
  const user = req.user && req.auth && req.user._id == req.auth._id

  if (!user) {
    return res.status(401).json({ error: 'Access denied' })
  }
  next()
}

// Check if user is Admin
exports.isAdmin = (req, res, next) => {
  const user = req.user && req.auth && req.user.role == 'Admin'

  if (!user) return res.status(401).json({ error: 'Acces danied' })
  next()
}
