const Category = require('../models/category')
const Product = require('../models/product')

// Create category
exports.createCategory = async (req, res) => {
  try {
    const category = new Category(req.body) // Create a new category

    const isExist = await Category.findOne({ name: req.body.name })

    // Check if a other category has been created with the same name
    if (isExist && isExist.name === req.body.name) {
      return res.status(400).json({ error: 'Category alredy exist' })
    }
    // Save category in database
    category.save((err, data) => {
      if (err) return res.status(400).json({ error: err })
      res.json(data)
    })
  } catch (error) {
    return res.status(400).json({ error })
  }
}

// Read category by ID
exports.readCategory = async (req, res) => {
  try {
    const category = await req.category
    res.json({ category })
  } catch (error) {
    return res.status(400).json({ error })
  }
}

// Read all category
exports.readAllCategories = async (req, res) => {
  try {
    const category = await Category.find()

    if (category.length <= 0) {
      return res.status(400).json({ error: 'No category found' })
    }

    res.json(category)
  } catch (error) {
    return res.status(400).json({ error })
  }
}

// Update category
exports.updateCategory = async (req, res) => {
  try {
    const category = await req.category
    const { name } = req.body
    const isExist = await Category.findOne({ name })

    // // Check if a other category has been created with the same name
    if (isExist && isExist.name && isExist.name !== category.name) {
      return res.status(400).json({ error: 'Category alredy exist' })
    }

    // Pass new category data to category object
    Object.assign(category, { name })

    // Save new category data in database
    category.save((err, data) => {
      if (err) return res.status(400).json({ error: err })
      res.json(data)
    })
  } catch (error) {
    return ''
  }
}

// Remove category
exports.removeCategory = async (req, res) => {
  try {
    const category = await req.category

    // Check if the category is associete to products
    const product = await Product.find({ category })
    if (category && product && product.length >= 1) {
      return res.status(400).json({
        error: `Sorry. You cant delete ${category.name}. It has ${product.length} associated products.`,
      })
    }

    category.delete((err, _res) => {
      if (err) return res.status(400).json({ message: err })
      return res.json({
        message: `${category.name} removed success`,
      })
    })
  } catch (error) {
    return res.status(400).json({ error })
  }
}

/**
 * Middlewares
 */

// Get category by ID from param
exports.getCategoryByID = async (req, res, next, id) => {
  try {
    const category = await Category.findById(id)
    if (!category) {
      return res.status(400).json({ error: 'Category not exits' })
    } else {
      // Pass category data in req.category
      req.category = category
      next()
    }
  } catch (error) {
    return res.status(400).json({ error })
  }
}
