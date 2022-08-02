// Requiring the entire npm package. It will search through the node_modules directory to find what it needs.
const jokes = require("give-me-a-joke");
const colors = require("colors");
// Referencing a globally installed package
const cowsay = require("cowsay");

// To get a random Chuck Norris joke, incorporating the colors package with it
jokes.getRandomCNJoke(function (joke) {
  console.log(joke.bold);
});
