const User = require('../models/user')

// Get user by ID from params
exports.getUserByID = async (req, res, next, id) => {
  try {
    User.findById(id).exec((err, user) => {
      if ((err, !user)) {
        return res.status(400).json({ error: 'User not exist' })
      } else {
        user.hashed_password = undefined
        user.salt = undefined
        req.user = user
        next()
      }
    })
  } catch (err) {
    return res.status(400).json({ error: 'Something wont wrong' + err })
  }
}

// Read user by ID from params
exports.readUser = async (req, res) => {
  try {
    req.user.hashed_password = undefined
    req.user.salt = undefined
    return res.json({ user: req.user })
  } catch (err) {
    return res.status(400).json({ error: 'Something wont wrong' + err })
  }
}

// Get all users
exports.readAllUsers = (req, res) => {
  try {
    User.find().exec((err, users) => {
      if (err) return res.status(400).json({ error: 'No user found' })
      return res.json({ users })
    })
  } catch (err) {
    return res.status(400).json({ error: 'Something wont wrong' + err })
  }
}

// Update the user
exports.updateUser = async (req, res) => {
  try {
    // Find user by ID
    const user = await User.findOne({ _id: req.user._id })
    const { name, email, about, role } = req.body
    // Find user by Email
    const isExist = await User.findOne({ email: req.body.email })

    if (!user) {
      return res.status(400).json({ error: 'User not exist' })
    }

    // Check if email is used by a other user
    if (email && isExist && isExist.email && isExist.email !== user.email) {
      return res
        .status(400)
        .json({ error: 'This email is already used by a other user' })
    }

    // Pass the request body to user and save new user data in database
    Object.assign(user, { name, email, role, about })

    user.save((err, data) => {
      if (err) return res.status(400).json({ error: err })

      user.hashed_password = undefined
      user.salt = undefined

      return res.json({ user: data })
    })
  } catch (err) {
    return res.status(400).json({ error: 'Something wont wrong' + err })
  }
}

// Update user password
exports.updatePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body
    const user = await User.findOne({ _id: req.user._id })
    // Check if the password is correct
    if (!user.authentificate(password)) {
      return res.status(400).json({ error: 'Wrong password !' })
    }

    Object.assign(user, { password: newPassword })

    user.save((err, data) => {
      if (err) {
        return res.status(400).json({ error: 'Something wont wrong' + err })
      }
      user.hashed_password = undefined
      user.salt = undefined

      return res.json({ user: data })
    })
  } catch (err) {
    return res.status(400).json({ message: 'Something wont wrong' + err })
  }
}
