const express = require('express')
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth')
const {
  createProduct,
  getProductByID,
  readAllProducts,
  readProduct,
  updateProduct,
  removeProduct,
  sortedListProduct,
  relatedProducts,
  image1,
  image2,
  productBySearch,
  productSearch,
} = require('../controllers/product')
const { getUserByID } = require('../controllers/user')

const router = express.Router()

router.post(
  '/product/create/:userID',
  requireSignin,
  isAuth,
  isAdmin,
  createProduct
)

router.get('/product/:productID', readProduct)

router.get('/products/', readAllProducts)

router.put(
  '/product/update/:productID/:userID',
  requireSignin,
  isAuth,
  isAdmin,
  updateProduct
)

router.delete(
  '/product/remove/:productID/:userID',
  requireSignin,
  isAuth,
  isAdmin,
  removeProduct
)

router.get('/products/sorted', sortedListProduct)

router.get('/products/related/:productID', relatedProducts)

router.get('/products/image1/:productID', image1)

router.get('/products/image2/:productID', image2)

router.post('/products/by/search', productBySearch)

router.get('/products/search', productSearch)

router.param('userID', getUserByID)
router.param('productID', getProductByID)

module.exports = router
