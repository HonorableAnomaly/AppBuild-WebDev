const bcrypt = require("bcrypt");

// const hashPassword = async (pw) => {
//   //   Generates a salt using exponential rounds (10)
//   const salt = await bcrypt.genSalt(12);
//   //   Generates hash including salt
//   const hash = await bcrypt.hash(pw, salt);
//   console.log(salt);
//   console.log(hash);
// };

// Same as above but with the salt and hash combined
const hashPassword = async (pw) => {
  const hash = await bcrypt.hash(pw, 12);
  console.log(hash);
};

// Simulated login using compare to match login info with 'stored' hash
const login = async (pw, hashedPw) => {
  const result = await bcrypt.compare(pw, hashedPw);
  if (result) {
    console.log("SUCCESSFUL MATCH! LOGGED YOU IN!");
  } else {
    console.log("NOT A MATCH! TRY AGAIN!");
  }
};

// hashPassword("monkey");
// login("monkey", "$2b$12$OXsV.zNUmSint.m/PPfpLuYUpqCaNsew1KvNuZdUpg86riuoLNAB6");
login("monkey", "$2b$12$v.rQZP0uYNIA8PJqF02SGOoFyIUI0avWi6qVxuYxDiHi0bds75ft6");
