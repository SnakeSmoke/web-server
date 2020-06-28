const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("../utils/geocode");
const forecast = require("../utils/forecast");

const app = express();
const PORT = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup HBS engine and vies location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res, next) => {
  res.render("index", {
    title: "weather App!",
    name: "Christian Ormos",
  });
});

app.get("/about", (req, res, next) => {
  res.render("about", {
    title: "About Me",
    name: "Christian Ormos",
  });
});

app.get("/help", (req, res, next) => {
  res.render("help", {
    title: "Help",
    name: "Christian Ormos",
  });
});

app.get("/weather", (req, res, next) => {
  if (!req.query.address) {
    return res.send({ error: "You must provide a location" });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) return res.send({ error });
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) return res.send({ error });
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res, next) => {
  if (!req.query.key) {
    return res.send({ error: "you must provide a search term" });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res, next) => {
  res.render("404Page", {
    title: "404",
    error: "article not found",
  });
});

app.get("*", (req, res, next) => {
  res.render("404Page", {
    title: "404",
    error: "page not found",
  });
});

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
