const express = require("express");
const app = express();
const path = require("path");
const { v4: uuid } = require("uuid");
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let comments = [
  {
    id: uuid(),
    username: "Ricky",
    comment: "Hi, my name is Ricky!",
  },
  {
    id: uuid(),
    username: "sk8erBoi",
    comment: "Plz deletee ur account Ricky.",
  },
  {
    id: uuid(),
    username: "RandoPando",
    comment: "No one around here nice eh?",
  },
  {
    id: uuid(),
    username: "Truth-Unveiled",
    comment: "Not here. Or anywhere. All inherently evil they are.",
  },
];

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/comments", (req, res) => {
  res.render("comments/index", { comments });
});

app.get("/comments/new", (req, res) => {
  res.render("comments/new");
});

app.post("/comments", (req, res) => {
  const { username, comment } = req.body;
  comments.push({ username, comment, id: uuid() });
  res.redirect("/comments");
});

app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/show", { comment });
});

app.patch("/comments/:id", (req, res) => {
  const { id } = req.params;
  const updatedComment = req.body.comment;
  const foundComment = comments.find((c) => c.id === id);
  foundComment.comment = updatedComment;
  res.redirect("/comments");
});

app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/edit", { comment });
});

app.delete("/comments/:id", (req, res) => {
  const { id } = req.params;
  comments = comments.filter((c) => c.id !== id);
  res.redirect("/comments");
});

// Basic get and post
// app.get("http://localhost:3000/tacos", (req, res) => {
//   res.send("GET /tacos response!");
// });

// app.post("http://localhost:3000/tacos", (req, res) => {
//   const { meat, qty } = req.body;
//   res.send(`Okay! Here are your ${qty} ${meat} tacos! Enjoy!`);
// });

app.listen(3000, () => {
  console.log("LISTENING ON PORT 3000...");
});
