const express = require("express");
const methodOverride = require("method-override");
const path = require("path");
const app = express();
const port = 3000;

// Database Connection
mongoose
  .connect("mongodb://localhost:27017/yelpcamp")
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

app.listen(port, () => {
  console.log(`Greenish Services Running On Port: ${port}`);
});
