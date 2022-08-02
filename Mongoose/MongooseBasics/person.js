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

const personSchema = new mongoose.Schema({
  first: String,
  last: String,
});

personSchema.virtual("fullName").get(function () {
  return `${this.first} ${this.last}`;
});

// Middleware functions
personSchema.pre("save", async function () {
  console.log("ABOUT TO SAVE!!!");
});

personSchema.post("save", async function () {
  console.log("JUST SAVED!!!");
});

const Person = mongoose.model("Person", personSchema);
