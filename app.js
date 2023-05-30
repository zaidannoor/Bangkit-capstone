var express = require("express");
var path = require("path");
var logger = require("morgan");

const customErrorHandler = require("./middleware/customErrorHandler");
const page404NotFound = require("./middleware/handler404NotFound");
var app = express();

require("dotenv").config();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.use(customErrorHandler);
app.use(page404NotFound);

module.exports = app;