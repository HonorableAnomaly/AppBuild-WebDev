// requiring the implementation of another file
// const math = require("./math");
// console.log(math.PI);
// console.log(math.square(9));

// destructured
// const { PI, square } = require("./math");
// console.log(PI);
// console.log(square(9));

const cats = require("./shelter");
console.log("REQUIRED AN ENTIRE DIRECTORY!", cats);
