// Requiring mongoose and database connection for bike shop
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/shopApp")
  .then(() => {
    console.log("MONGOOSE SAW YOU!");
  })
  .catch((err) => {
    console.log("OH NO! MONGOOSE HAS HIDDEN ITSELF!");
    console.log(err);
  });

//  Mongoose schema setup for product database
const productSchema = new mongoose.Schema({
  name: {
    //  Type is the default if making a short-hand line for the key value pairs
    type: String,
    required: true,
    maxlength: 20,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Price must be a positive number"],
  },
  color: String,
  onSale: {
    type: Boolean,
    default: false,
  },
  categories: [String],
  qty: {
    online: {
      type: Number,
      default: 0,
    },
    inStore: {
      type: Number,
      default: 0,
    },
  },
  size: {
    type: String,
    enum: ["S", "M", "L", "XL", "XXL"],
  },
});

//
// Custom method to have a searched product greet us
// productSchema.methods.greet = function () {
//   console.log("HELLLO!! HI! HOWDY!!!");
//   console.log(`- from ${this.name}`);
// };

// Custom method to toggle a product to be on sale
// productSchema.methods.toggleOnSale = function () {
//   this.onSale = !this.onSale;
//   return this.save();
// };

// Custom method to add a category to a product
// productSchema.methods.addCategory = function (newCat) {
//   this.categories.push(newCat);
//   return this.save();
// };

// Static method to toggle onSale to all products and set their price to free
productSchema.statics.fireSale = function () {
  return this.updateMany({}, { onSale: true, price: 0 });
};

//
// Model class that allows for the creation of new instances of products that can be saved to the database
// When called, creates an instance of the class and creates the collection in the database
const Product = mongoose.model("Product", productSchema);

//
// Product search and calling greet method
// const findProduct = async () => {
//   const foundProduct = await Product.findOne({ name: "Gloves" });
//   foundProduct.greet();
// };

// Toggle sale function that goes with the method
// const findProduct = async () => {
//   const foundProduct = await Product.findOne({ name: "Gloves" });
//   console.log(foundProduct);
//   await foundProduct.toggleOnSale();
//   console.log(foundProduct);
// };

// Add category to product
// const findProduct = async () => {
//   const foundProduct = await Product.findOne({ name: "Gloves" });
//   console.log(foundProduct);
//   await foundProduct.addCategory("Outdoors");
//   console.log(foundProduct);
// };

// Callback for fireSale
Product.fireSale().then((res) => console.log(res));

// Calls the product for the above methods and functions
// findProduct();

//
// Creating a product
//
// const bikeProduct = new Product({ name: "Cycling Jersey", price: 28.5, categories: ["cycling", "clothing"], size: "M" });
// bikeProduct
//   .save()
//   .then((data) => {
//     console.log("Product saved!");
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log("Oh no! An error has occurred!");
//     console.log(err);
//   });

//
// Updating a product
//
// Product.findOneAndUpdate({ name: "Tire Pump" }, { price: -21.99 }, { new: true, runValidators: true })
//   .then((data) => {
//     console.log("Product updated!");
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log("Oh no! An error has occurred!");
//     console.log(err);
//   });
