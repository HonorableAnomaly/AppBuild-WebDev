const express = require("express");
const app = express();
// A directory inside of express
const path = require("path");
// Requiring a JSON file
const redditData = require("./data.json");

// Used to make the path to the views dir available from running our server anywhere, even outside of the dir where the folder is at.
// Broken -- likely need to update syntax
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
// Used to make the path to the views dir available from running our server anywhere, even outside of the dir where the folder is at.
// Broken -- likely need to update syntax
app.set("views", path.join(__dirname, "views"));

// Render allows us to 'send' a file as a response rather than just a string
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/pokemon", (req, res) => {
  const pokemon = ["Bulbasaur", "Charizard", "Mewtwo", "Pikachu", "Dragonite", "Gyarados"];
  res.render("pokemon", { pokemon });
});

app.get("/r/:subreddit", (req, res) => {
  const { subreddit } = req.params;
  const data = redditData[subreddit];
  if (data) {
    res.render("subreddit", { ...data });
  } else {
    res.render("notfound", { subreddit });
  }
});

app.get("/rand", (req, res) => {
  const num = Math.floor(Math.random() * 10) + 1;
  // res.render("random", { rand: num });  // This object gets passed to the ejs template and the key value pair can be combined into one variable name, like below
  res.render("random", { num });
});

app.listen(3000, () => {
  console.log("LISTENING ON PORT 3000...");
});
