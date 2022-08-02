const express = require("express");
const app = express();

// req is an object created by express, and while res is too, it serves as the response object the server returns

// app.use((req, res) => {
//   console.log("WE GOT A NEW REQUEST!");
//   //   res.send("HELLO! WE GOT YOUR REQUEST! THIS IS A RESPONSE!");
//   //   res.send({ color: "blue" });
//   res.send("<h1>This is my webpage!</h1>");
// });

// Root route get request is just a slash
app.get("/", (req, res) => {
  console.log("YOU'VE CALLED THE HOMEPAGE!");
  res.send("<h1>WELCOME HOME!</h1>");
});

// Pattern matching using the req as input
app.get("/r/:subreddit", (req, res) => {
  const { subreddit } = req.params;
  console.log(req.params);
  console.log("YOU'VE REQUESTED A SUBREDDIT!");
  res.send(`<h1>Welcome to the ${subreddit} subreddit!</h1>`);
});

// Further nesting of paths
app.get("/r/:subreddit/:postId", (req, res) => {
  const { subreddit, postId } = req.params;
  console.log(req.params);
  console.log("YOU'VE REQUESTED A SUBREDDIT!");
  res.send(`<h1>Viewing Post ID:${postId} on the ${subreddit} subreddit!</h1>`);
});

// Examples of separate paths for responses
app.get("/bulbasaur", (req, res) => {
  console.log("YOUR BULBASAUR HEARD YOUR CALL!");
  res.send("<h1>BULBA BULBA BULBASAUR!</h1>");
});

app.get("/charmander", (req, res) => {
  console.log("YOUR CHARMANDER HEARD YOUR CALL!");
  res.send("<h1>CHARMANDER CHAR!!</h1>");
});

app.post("/charmander", (req, res) => {
  console.log("YOUR CHARMANDER HEARD YOUR CALL!");
  res.send("<h1>CHARMANDER CHAR!!</h1> This is different than a get request!");
});

app.get("/squirtle", (req, res) => {
  console.log("YOUR SQUIRTLE HEARD YOUR CALL!");
  res.send("<h1>SQUIRTLE SQUIR SQUIRTLE!</h1>");
});

app.get("/search", (req, res) => {
  const { q } = req.query;
  if (!q) {
    res.send("<h1>Your search for nothing has produced... well... nothing.</h1>");
  } else {
    res.send(`<h1>Search results for ${q} were a success!</h1>`);
  }
});

// The star is a catch-all for invalid requests that weren't coded or would otherwise fail
app.get("*", (req, res) => {
  console.log("AN INVALID REQUEST HAS BEEN MADE!");
  res.send("<h1>I'M SORRY, BUT WE DON'T HAVE THAT HERE! TRY CALLING A POKéMON'S NAME!</h1>");
});

// Listener that enables the server
app.listen(3000, () => [console.log("LISTENING ON PORT 3000!")]);
