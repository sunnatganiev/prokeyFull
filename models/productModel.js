const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  translations: {
    ru: {
      name: {
        type: String,
      },
      description: {
        type: String,
      },
    },
    en: {
      name: {
        type: String,
      },
      description: {
        type: String,
      },
    },
  },
});

const Product = mongoose.model("Product", productSchema);

exports.Product = Product;
exports.productSchema = productSchema;
