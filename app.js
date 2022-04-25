const express = require("express");
const methodOverride = require("method-override");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

// Models
const { Service, Request } = require("./models/request");

// Database Connection
mongoose
  .connect("mongodb://localhost:27017/relationDemo")
  .then(() => {
    console.log("Mongoose Running");
  })
  .catch((error) => console.log(`Connection Error : ${error}`));

// Set and use, engines and apis
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/services", async (req, res) => {
  const services = await Service.find({});
  console.log(services);
  res.send(services);
});

app.get("/services/:id", async (req, res) => {
  const { id } = req.params;
  const service = await Service.findById(id);
  const variants = service.variants;
  res.send(variants);
});

app.listen(port, () => {
  console.log(`Greenish Services Running On Port: ${port}`);
});
