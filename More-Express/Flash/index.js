const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const AppError = require("./AppError");
const session = require("express-session");
// Flash required here
const flash = require("connect-flash");

const sessionOptions = { secret: "thisisnotagoodsecret", resave: false, saveUninitialized: false };
app.use(session(sessionOptions));
// Flash called here
app.use(flash());

const Product = require("./models/product");
const Farm = require("./models/farm");

mongoose
  .connect("mongodb://localhost:27017/farmStandFlash")
  .then(() => {
    console.log("MONGO CONNECTION OPEN...");
  })
  .catch((err) => {
    console.log("OH NO! MONGO CONNECTION ERROR!");
    console.log(err);
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// ***FARM ROUTES***
//
// Flash middleware!
app.use((req, res, next) => {
  res.locals.messages = req.flash("success");
  next();
});

app.get(
  "/farms",
  wrapAsync(async (req, res, next) => {
    const farms = await Farm.find({});
    // Messages for req.flash is then executed here to render the flash on this page after creation of a new farm (displayed on the show page)
    // Messages is no longer needed when using middleware example for Flash
    res.render("farms/index", {
      farms,
      // , messages: req.flash("success")
    });
  })
);

app.get("/farms/new", (req, res) => {
  res.render("farms/new");
});

app.post(
  "/farms",
  wrapAsync(async (req, res, next) => {
    const newFarm = new Farm(req.body);
    await newFarm.save();
    // Flash is added here to add the data to the session
    req.flash("success", "A new farm has sprouted!");
    res.redirect("/farms");
  })
);

app.get(
  "/farms/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const farm = await Farm.findById(id).populate("products");
    if (!farm) {
      throw new AppError(404, "Farm Not Found");
    }
    res.render("farms/show", { farm });
  })
);

app.get(
  "/farms/:id/products/new",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const farm = await Farm.findById(id);
    res.render("products/new", { categories, farm });
  })
);

app.post(
  "/farms/:id/products",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const farm = await Farm.findById(id);
    const { name, price, category } = req.body;
    const product = new Product({ name, price, category });
    farm.products.push(product);
    product.farm = farm;
    await farm.save();
    await product.save();
    res.redirect(`/farms/${id}`);
  })
);

app.get(
  "/farms/:id/edit",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const farm = await Farm.findById(id);
    if (!farm) {
      throw new AppError(404, "Farm Not Found");
    }
    res.render("farms/edit", { farm });
  })
);

app.put(
  "/farms/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const farm = await Farm.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.render("farms/show", { farm });
  })
);

app.delete(
  "/farms/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const deletedFarm = await Farm.findByIdAndDelete(id);
    res.redirect("/farms");
  })
);

// ***PRODUCT ROUTES***
//
const categories = ["fruit", "vegetable", "dairy", "fungi", "protein", "baked goods"];

function wrapAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((e) => next(e));
  };
}

app.get(
  "/products",
  wrapAsync(async (req, res, next) => {
    const { category } = req.query;
    if (category) {
      const products = await Product.find({ category });
      res.render("products/index", { products, category });
    } else {
      const products = await Product.find({});
      res.render("products/index", { products, category: "All" });
    }
  })
);

app.get("/products/new", (req, res) => {
  res.render("products/new", { categories });
});

app.post(
  "/products",
  wrapAsync(async (req, res, next) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
  })
);

app.get(
  "/products/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate("farm", "name");
    if (!product) {
      throw new AppError(404, "Product Not Found");
    }
    res.render("products/show", { product });
  })
);

app.get(
  "/products/:id/edit",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      throw new AppError(404, "Product Not Found");
    }
    res.render("products/edit", { product, categories });
  })
);

app.put(
  "/products/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.render("products/show", { product });
  })
);

app.delete(
  "/products/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect("/products");
  })
);

const handleValidationErr = (err) => {
  console.dir(err);
  return new AppError(400, `Validation failed...${err.message}`);
};

app.use((err, req, res, next) => {
  console.log(err.name);
  if (err.name === "Validation Error") err = handleValidationErr(err);
  next();
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Error!" } = err;
  res.status(status).send(message);
});

app.listen(3000, () => {
  console.log("LISTENING ON PORT 3000!");
});
