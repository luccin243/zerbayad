const express = require('express')
const { signup, signin, signout } = require('../controllers/auth')
const { signupValidator } = require('../validators/validatorsSchema')

const router = express.Router()

router.post('/signup', signupValidator, signup)
router.post('/signin', signin)
router.post('/signout', signout)

module.exports = router
