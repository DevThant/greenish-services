const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const port = 3000;

// Models
const { Service, Request } = require("./models/request");

// Templating
const ejsMate = require("ejs-mate");

// Database Connection
mongoose
  .connect("mongodb://localhost:27017/greenish-services-hvac")
  .then(() => {
    console.log("Mongoose Running");
  })
  .catch((error) => console.log(`Connection Error : ${error}`));

// Set and use, engines and apis
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

// Show Main Services
app.get("/services", async (req, res) => {
  const services = await Service.find({});
  res.render("services/index", { services });
});

// Create Main Services
app.get("/services/new", (req, res) => {
  res.render("services/new");
});

app.post("/services", async (req, res) => {
  const service = new Service(req.body.service);
  await service.save();
  res.redirect(`/services/${service.id}`);
});

// Show Default Service Options
app.get("/services/:id", async (req, res) => {
  const { id } = req.params;
  const service = await Service.findById(id);
  const services = service.defaultVariants;
  console.log(services);

  res.render("services/show", { service, services });
});

// Create Default Service Options
app.get("/services/:id/new_d_varaint", async (req, res) => {
  const service = await Service.findById(req.params.id);
  res.render("/services/new-default-variant", { service });
});

app.patch("/services/:id", async (req, res) => {
  const { id } = req.params;
  const service = await Service.findById(id);
  service.defaultVariants.push(req.body.newVariant);
  await service.save();
  res.redirect(`/services/${service.id}`);
});

// Show Extended Service Options
app.get("/services/:id/options", async (req, res) => {
  const { id } = req.params;
  const service = await Service.findById(id);
  const services = service.variants;
  res.render("services/show-variants", { service, services });
});
// Create Extended Service Option
app.get("/services/:id/new_varaint", async (req, res) => {
  const service = await Service.findById(req.params.id);
  res.render("/services/new-variant", { service });
});

app.patch("/services/:id", async (req, res) => {
  const { id } = req.params;
  const service = await Service.findById(id);
  service.variants.push(req.body.newVariant);
  await service.save();
  res.redirect(`/services/${service.id}/options`);
});

// Service Request (Decide whether the request is default or extended options based on query)
app.get("/services/:id&:vid/request", async (req, res) => {
  const { id, vid } = req.params;
  const { option } = req.query; // Expect ?option=variants or ?option=defaultVariants
  const service = await Service.findById(id);
  if (option) {
    if (option === "variants") {
      const variant = service.variants.filter((v) => v.id === vid);
      res.send([variant]);
    } else if (option === "defaultVariants") {
      const variant = service.defaultVariants.filter((v) => v.id === vid);
      res.send([variant]);
    } else {
      res.send("Need Valid Option");
    }
  }
  res.send("Need Option");

  // console.log(service, option);
});

app.listen(port, () => {
  console.log(`Greenish Services Running On Port: ${port}`);
});
