const express = require("express");
const app = express();
const shelterRoutes = require("./routes/shelters");
const dogRoutes = require("./routes/dogs");
const classifiedRoutes = require("./routes/classified");

app.use("/shelters", shelterRoutes);
app.use("/dogs", dogRoutes);
app.use("/classified", classifiedRoutes);

app.listen(3000, () => {
  console.log("Serving on port 3000...");
});
