const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    strim: true,
    minlength: 3,
    maxlength: 32,
    unique: true,
  },
})

module.exports = mongoose.model('Category', categorySchema)
