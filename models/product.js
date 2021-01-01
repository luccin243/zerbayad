const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const Schema = mongoose.Schema

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxLength: 32,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxLength: 64,
    },

    story: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxLength: 150,
    },

    price: { type: Number, default: 0 },

    price2: { type: Number, default: 0 },

    price3: { type: Number, default: 0 },

    procentege: { type: Number, default: 0 },

    image1: {
      data: Buffer,
      contentType: String,
    },

    image2: {
      data: Buffer,
      contentType: String,
    },

    quantity: {
      type: Number,
    },

    shopping: {
      type: Boolean,
      default: false,
    },

    sells: {
      type: Number,
      default: 0,
    },

    category: {
      type: ObjectId,
      ref: 'Category',
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Product', productSchema)
