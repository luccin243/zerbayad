const express = require('express')
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth')
const {
  createCategory,
  getCategoryByID,
  readCategory,
  readAllCategory,
  updateCategory,
  removeCategory,
} = require('../controllers/category')
const { getUserByID } = require('../controllers/user')
const {
  createCategoryValidator,
  updateCategoryValidator,
} = require('../validators/validatorsSchema')

const router = express.Router()

router.post(
  '/category/create/:userID',
  createCategoryValidator,
  requireSignin,
  isAuth,
  isAdmin,
  createCategory
)

router.get('/category/:categoryID', readCategory)

router.get('/categories', readAllCategory)

router.put(
  '/category/update/:categoryID/:userID',
  updateCategoryValidator,
  requireSignin,
  isAuth,
  isAdmin,
  updateCategory
)

router.delete(
  '/category/remove/:categoryID/:userID',
  requireSignin,
  isAuth,
  isAdmin,
  removeCategory
)

router.param('userID', getUserByID)
router.param('categoryID', getCategoryByID)

module.exports = router
