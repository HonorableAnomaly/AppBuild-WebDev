const express = require("express");
const app = express();
const morgan = require("morgan");

const AppError = require("./AppError");

app.use(morgan("dev"));

// The order that we place middleware matters for execution!
app.use((req, res, next) => {
  // req.method = "GET";
  req.requestTime = Date.now();
  console.log(req.method, req.path);
  next();
});

app.use("/dogs", (req, res, next) => {
  console.log("I LOVE DOGS!");
  next();
});

// Thrown error
const verifyPassword = (req, res, next) => {
  const { password } = req.query;
  if (password === "chickennugget") {
    next();
  }
  // res.send("SORRY, YOU NEED A PASSWORD!");
  throw new AppError(401, "Password required");
};

app.get("/", (req, res) => {
  console.log(`REQUEST TIME: ${req.requestTime}`);
  res.send("HOME PAGE!");
});

// Thrown syntax error
app.get("/error", (req, res) => {
  chicken.fly();
});

app.get("/dogs", (req, res) => {
  console.log(`REQUEST TIME: ${req.requestTime}`);
  res.send("WOOF WOOF!");
});

// Using verifyPassword middleware in the arguments
app.get("/secret", verifyPassword, (req, res, next) => {
  res.send("MY SECRET IS: I REALLY LIKE POKéMON!");
});

app.get("/admin", (req, res) => {
  throw new AppError(403, "You are not an Admin!");
});

//
// Typical last ditch error response without being an error handler
app.use((req, res) => {
  res.status(404).send("Whatever you may be seeking, we know it isn't that. We don't have any of that.");
});

// Error handlers must be last!
//
// app.use((err, req, res, next) => {
//   console.log("**************************************");
//   console.log("**************ERROR*******************");
//   console.log("**************************************");
//   console.log(err);
// One option for error handling
// res.status(500).send("OH BOY, AN ERROR!");
//
// Calls the next error-handling middleware
//   next(err);
// });

// Three ways to handle errors without error class
// app.use((err, req, res, next) => {
//   const { status = 500 } = err;
//   res.status(status).send("ERROOORORRRRR!!!");
// });

// app.use((err, req, res, next) => {
//   const { status = 500 } = err;
//   const { message = "ERROOORORRRRR!!!" } = err;
//   res.status(status).send(message);
// });

// Using status and message from the AppError class to display
app.use((err, req, res, next) => {
  const { status = 500, message = "ERROOORORRRRR!!!" } = err;
  res.status(status).send(message);
});

app.listen(3000, () => {
  console.log("Serving on port 3000...");
});
