const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
app.use(cookieParser("thisismysecret"));

app.get("/greet", (req, res) => {
  const { name = "No-Name" } = req.cookies;
  res.send(`Hey there, ${name}!`);
});

app.get("/setname", (req, res) => {
  res.cookie("name", "Toddicus");
  res.cookie("animal", "harlequin shrimp");
  res.send("Okay, sent you a cookie!");
});

app.get("/getsignedcookie", (req, res) => {
  res.cookie("oreo", "mint chocolate", { signed: true });
  res.send("Okay, signed your Oreo cookie!");
});

app.get("/verifyoreo", (req, res) => {
  console.log(req.cookies);
  console.log(req.signedCookies);
  res.send(req.signedCookies);
});

app.listen(3000, () => {
  console.log("Serving on port 3000...");
});
