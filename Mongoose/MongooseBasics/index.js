// Requiring mongoose and database connection
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/gameApp")
  .then(() => {
    console.log("MONGOOSE SAW YOU!");
  })
  .catch((err) => {
    console.log("OH NO! MONGOOSE HAS HIDDEN ITSELF!");
    console.log(err);
  });

//  Mongoose schema setup for database
const gameSchema = new mongoose.Schema({
  title: String,
  publisher: String,
  release: Number,
  genre: String,
  platform: String,
});

// Class that allows for the creation of new instances of the class that can be saved to the database
// When called, creates an instance of the class and creates the collection in the database
const Game = mongoose.model("Game", gameSchema);

//
//
//
// Call the variable in node repl after hitting .load index.js and add the .save() method to save a single entry
// const donkeykongcountry = new Game({ title: "Donkey Kong Country", release: 1994, genre: "platform", platform: "Super Nintendo" });

// Adding multiple objects using insertMany does not require using a .save method
// Game.insertMany([
//   { title: "Donkey Kong Country 2", publisher: "Nintendo", release: 1994, genre: "platform", platform: "Super Nintendo" },
//   { title: "Donkey Kong Country 3", publisher: "Nintendo", release: 1995, genre: "platform", platform: "Super Nintendo" },
//   { title: "Pokémon", publisher: "Nintendo", release: 1996, genre: "role-playing", platform: "Game Boy" },
//   { title: "Banjo-Kazooie", publisher: "Nintendo", release: 1998, genre: "platform", platform: "Nintendo 64" },
//   { title: "Banjo-Tooie", publisher: "Nintendo", release: 2000, genre: "platform", platform: "Nintendo 64" },
// ]).then((data) => {
//   console.log("SUCCESS!");
//   console.log(data);
// });
