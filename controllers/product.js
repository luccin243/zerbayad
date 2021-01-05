const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')
const Category = require('../models/category')
const Product = require('../models/product')

// Create Product
exports.createProduct = async (req, res) => {
  try {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: 'Image could not be uploaded',
        })
      }
      // check for all fields
      const {
        name,
        description,
        story,
        price,
        price2,
        price3,
        procentege,
        category,
        quantity,
        shipping,
      } = fields

      if (
        !name ||
        !description ||
        !price ||
        !price2 ||
        !price3 ||
        !procentege ||
        !category ||
        !quantity ||
        !story ||
        !shipping
      ) {
        return res.status(400).json({
          error: 'All fields are required',
        })
      }

      let product = new Product(fields)

      if (files.image1 || files.image2) {
        if (files.image1.size > 1000000) {
          return res.status(400).json({
            error: `${files.image.size} should be less than 1mb in size`,
          })
        } else if (files.image2.size > 1000000) {
          return res.status(400).json({
            error: `${files.image.size} should be less than 1mb in size`,
          })
        } else {
          product.image1.data = fs.readFileSync(files.image1.path)
          product.image1.contentType = files.image1.type

          product.image2.data = fs.readFileSync(files.image2.path)
          product.image2.contentType = files.image2.type
        }
      }

      product.save((err, result) => {
        if (err) {
          return res.status(400).json({
            error: 'Error on sava the new product',
          })
        }
        res.json(result)
      })
    })
  } catch (error) {
    return res.status(400).json({ error })
  }
}

// Read Product by ID
exports.readProduct = async (req, res) => {
  try {
    const product = await req.product
    product.image1 = undefined
    product.image2 = undefined
    res.json(product)
  } catch (error) {
    return res.status(400).json({ error })
  }
}

// Read all Products
exports.readAllProducts = async (req, res) => {
  try {
    const product = await Product.find().select('-image1').select('-image2')

    if (product.length <= 0) {
      return res.status(400).json({ error: 'No product found' })
    }

    res.json(product)
  } catch (error) {
    return res.status(400).json({ error })
  }
}

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: 'Image could not be uploaded',
        })
      }
      // check for all fields
      const {
        name,
        description,
        story,
        price,
        price2,
        price3,
        procentege,
        category,
        quantity,
        shipping,
      } = fields

      let product = req.product

      product = _.extend(product, fields)

      if (files.image1 || files.image2) {
        if (files.image1.size > 1000000) {
          return res.status(400).json({
            error: `${files.image.size} should be less than 1mb in size`,
          })
        } else if (files.image2.size > 1000000) {
          return res.status(400).json({
            error: `${files.slide1.size} should be less than 1mb in size`,
          })
        } else {
          product.image1.data = fs.readFileSync(files.image1.path)
          product.image1.contentType = files.image1.type

          product.image2.data = fs.readFileSync(files.image2.path)
          product.image2.contentType = files.image2.type
        }
      }

      product.save((err, result) => {
        if (err) {
          return res.status(400).json({
            error: 'Error on save update product',
          })
        }
        result.image1 = undefined
        result.image2 = undefined
        res.json(result)
      })
    })
  } catch (error) {
    return res.status(400).json({ error })
  }
}

// Remove category
exports.removeProduct = async (req, res) => {
  try {
    const product = await req.product
    product.delete((err, _res) => {
      if (err) return res.status(400).json({ error: err })
      return res.json({ message: `${product.name} removed success` })
    })
  } catch (error) {
    return res.status(400).json({ error })
  }
}

/**
 * Get list of ptoduct by sells or by arrival
 * Get by sells = /product?sortBy=sells&order=desc&limit=6
 * Get by arrival = /product?sortBy=createdAt&order=desc&limit=6
 */

exports.sortedListProduct = async (req, res) => {
  try {
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    const product = await Product.find()
      .select('-image1')
      .select('-image2')
      .populate('category')
      .sort([[sortBy, order]])
      .limit(limit)

    if (product.length <= 0) {
      return res.status(400).json({ error: 'No product found' })
    } else {
      res.json(product)
    }
  } catch (error) {
    return res.status(400).json({ error: 'Error with sorted list' })
  }
}

/**
 * Find product based on request product category
 * It will resturn all product with the same category name
 */

exports.relatedProducts = async (req, res) => {
  try {
    let limit = req.query.limit ? parseInt(req.query.limit) : 4
    const product = await Product.find({
      _id: { $ne: req.product },
      category: req.product.category,
    })
      .populate('category', '_id name')
      .select('-image1')
      .select('-image2')
      .limit(limit)

    if (product <= 0) {
      res.status(400).json({ error: 'No related product found' })
    }
    res.json(product)
  } catch (error) {
    return res.status(400).json({ error: 'Error with related list' })
  }
}

exports.listCategories = async (req, res) => {
  try {
    Product.distinct('category', {}, (err, categories) => {
      if (err) {
        return res.status(400).json({
          error: 'Categories not found',
        })
      }
      res.json(categories)
    })
  } catch (error) {
    return res.status(400).json({ error: 'Error with get list category' })
  }
}

/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */

exports.productBySearch = (req, res) => {
  let order = req.body.order ? req.body.order : 'desc'
  let sortBy = req.body.sortBy ? req.body.sortBy : '_id'
  let limit = req.body.limit ? parseInt(req.body.limit) : 100
  let skip = parseInt(req.body.skip)
  let findArgs = {}

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === 'price') {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        }
      } else {
        findArgs[key] = req.body.filters[key]
      }
    }
  }

  Product.find(findArgs)
    .select('-image1')
    .select('-image2')
    .populate('category')
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: 'Products not found',
        })
      }
      res.json({
        size: data.length,
        data,
      })
    })
}

exports.productSearch = (req, res) => {
  // create query object to hold search value and category value
  const query = {}
  // assign search value to query.name
  if (req.query.search) {
    query.name = { $regex: req.query.search, $options: 'i' }
    // assigne category value to query.category
    if (req.query.category && req.query.category != 'All') {
      query.category = req.query.category
    }
    // find the product based on query object with 2 properties
    // search and category
    Product.find(query, (error, products) => {
      if (error) {
        return res.status(400).json({
          error: errorHandler(error),
        })
      }
      res.json(products)
    })
      .select('-image1')
      .select('-image2')
  }
}

/**
 * Middlewares
 */

/**
 * Get product by id
 * @param {Request} req
 * @param {Response} res
 * @param {Fuction callback} next
 * @param {Product ID} id
 */
exports.getProductByID = async (req, res, next, id) => {
  try {
    const product = await Product.findById(id).populate('category')
    if (!product) {
      return res.status(400).json({ error: 'Product not exist' })
    } else {
      req.product = product
      next()
    }
  } catch (error) {
    return res.status(400).json({ error: 'Error with get product by id' })
  }
}

/**
 * Show images
 */

exports.image1 = (req, res, next) => {
  if (req.product.image1.data) {
    res.set('Content-Type', req.product.image1.contentType)
    return res.send(req.product.image1.data)
  }
  next()
}

exports.image2 = (req, res, next) => {
  if (req.product.image2.data) {
    res.set('Content-Type', req.product.image2.contentType)
    return res.send(req.product.image2.data)
  }
  next()
}

exports.decreaseQuantity = (req, res, next) => {
  let bulkOps = req.body.order.products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    }
  })

  Product.bulkWrite(bulkOps, {}, (error, products) => {
    if (error) {
      return res.status(400).json({
        error: 'Could not update product',
      })
    }
    next()
  })
}
