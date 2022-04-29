const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const port = 3000;

// Models
const Request = require("./models/request");
const Service = require("./models/service");
const Choice = require("./models/choice");
const ExInstallation = require("./models/exInstallation");

// Templating
const ejsMate = require("ejs-mate");
const res = require("express/lib/response");

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

// Service Categories (Put this in edit form route)
const categories = ["hvac", "solar", "electrical", "plumbing", "grounding"];

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

// Services Routes
// Show Main Services
app.get("/services", async (req, res) => {
  const { category } = req.query;
  if (category) {
    if (category === "all") {
      const services = await Service.find();
      return res.render("services/index", { services, category: "All" });
    }
    const services = await Service.find({ category });
    return res.render("services/index", { services, category });
  } else {
    const services = await Service.find();
    return res.render("services/index", { services, category: "All" });
  }
});

// Create Main Services (!! Not Accessible to Users)
app.get("/services/new", (req, res) => {
  res.render("services/new", { categories });
});
// Create Service (!! Not Accessible to Users)
app.post("/services", async (req, res) => {
  const service = new Service(req.body.service);
  await service.save();
  res.redirect(`/services/${service.id}`);
});

app.get("/services/:id", async (req, res) => {
  const { id } = req.params;
  const service = await Service.findById(id);
  res.render("services/show", { service });
});

app.get("/services/:id/edit", async (req, res) => {
  const { id } = req.params;
  const service = await Service.findById(id);
  res.render("services/edit", { service, categories });
});

app.put("/services/:id", async (req, res) => {
  const { id } = req.params;
  const service = await Service.findByIdAndUpdate(
    id,
    { ...req.body.service },
    {
      runValidators: true,
    }
  );
  res.redirect(`/services/${service.id}`);
});

app.delete("/services/:id", async (req, res) => {
  const { id } = req.params;
  await Service.findByIdAndDelete(id);
  res.redirect("/services");
});

// Show Default Service Options
app.get("/services/:id/choices", async (req, res) => {
  const { id } = req.params;
  const service = await Service.findById(id).populate("choices");
  const choices = service.choices;
  res.render("choices/index", { service, choices });
});

// Show alternative options for the service
app.get("/services/:id/installations", async (req, res) => {
  const { id, option } = req.params;
  const service = await Service.findById(id).populate("exInstallations");
  const options = service.exInstallations;
  res.render("installations/index", { service, options });
});

app.get("/services/:id/choices/new", async (req, res) => {
  const service = await Service.findById(req.params.id);
  res.render("choices/new", { service });
});

app.get("/services/:id/installations/new", async (req, res) => {
  const service = await Service.findById(req.params.id);
  res.render("installation/new", { service });
});

app.post("/services/:id/choices", async (req, res) => {
  const { id } = req.params;
  const service = await Service.findById(id);
  const choice = new Choice({ ...req.body.choice });
  service.choices.push(choice);
  choice.service = service;
  await service.save();
  await choice.save();
  res.redirect(`/services/${service.id}`);
});

app.post("/services/:id/installations", async (req, res) => {
  const { id } = req.params;
  const service = await Service.findById(id);
  const option = new ExInstallation({ ...req.body.option });
  service.exInstallations.push(option);
  option.service = service;
  await service.save();
  await option.save();
  res.redirect(`/services/${service.id}`);
});

function add(option){
  const option = new ExInstallation({ ...req.body.option });
  service.exInstallations.push(option);
  option.service = service;
  await service.save();
  await option.save();
  res.redirect(`/services/${service.id}`);
}
// // Create Default Service Options
// app.get("/services/:id/new_d_varaint", async (req, res) => {
//   const service = await Service.findById(req.params.id);
//   res.render("/services/new-default-variant", { service });
// });

// app.patch("/services/:id", async (req, res) => {
//   const { id } = req.params;
//   const service = await Service.findById(id);
//   service.defaultVariants.push(req.body.newVariant);
//   await service.save();
//   res.redirect(`/services/${service.id}`);
// });

// // Show Extended Service Options
// app.get("/services/:id/options", async (req, res) => {
//   const { id } = req.params;
//   const service = await Service.findById(id);
//   const services = service.variants;
//   res.render("services/show-variants", { service, services });
// });
// // Create Extended Service Option
// app.get("/services/:id/new_varaint", async (req, res) => {
//   const service = await Service.findById(req.params.id);
//   res.render("/services/new-variant", { service });
// });

// // Service Request (Decide whether the request is default or extended options based on query)
// app.get("/services/:id&:vid/request", async (req, res) => {
//   const { id, vid } = req.params;
//   const { option } = req.query; // Expect ?option=variants or ?option=defaultVariants
//   const service = await Service.findById(id);
//   if (option) {
//     if (option === "variants") {
//       const variant = service.variants.filter((v) => v.id === vid);
//       res.send([variant]);
//     } else if (option === "defaultVariants") {
//       const variant = service.defaultVariants.filter((v) => v.id === vid);
//       res.send([variant]);
//     } else {
//       res.send("Need Valid Option");
//     }
//   }
//   res.send("Need Option");

//   // console.log(service, option);
// });

app.listen(port, () => {
  console.log(`Greenish Services Running On Port: ${port}`);
});
