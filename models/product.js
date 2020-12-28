const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const productSchema = new mongoose.Schema(
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
      maxLength: 150,
    },
    story: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxLength: 150,
    },
    price: {
      type: Number,
      priceSizes: [
        {
          type: Number,
        },
      ],
    },
    procentege: { type: Number, default: 0 },
    image: [
      {
        type: Buffer,
        contentType: String,
        productSlider: [
          {
            type: Buffer,
            contentType: String,
          },
        ],
      },
    ],
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
