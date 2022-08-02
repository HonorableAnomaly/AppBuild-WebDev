const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    // Custom error handling string added to required property
    required: [true, "Name cannot be blank"],
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    lowercase: true,
    enum: ["fruit", "vegetable", "dairy", "fungi", "baked goods"],
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
