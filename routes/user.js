const express = require('express')
const {
  getUserByID,
  readUser,
  readAllUsers,
  updateUser,
  updatePassword,
} = require('../controllers/user')
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth')
const {
  updateUserValidator,
  updatePasswordValidator,
} = require('../validators/validatorsSchema')

const router = express.Router()

router.get('/user/:userID', requireSignin, isAuth, readUser)

router.put(
  '/user/update/:userID',
  requireSignin,
  isAuth,
  updateUserValidator,
  updateUser
)

router.put(
  '/user/update/password/:userID',
  requireSignin,
  isAuth,
  updatePasswordValidator,
  updatePassword
)

router.get('/users/:userID', requireSignin, isAuth, isAdmin, readAllUsers)

router.param('userID', getUserByID)

module.exports = router
