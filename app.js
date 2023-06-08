var express = require("express");
var path = require("path");
var logger = require("morgan");

const authRouter = require('./app/auth/route');
const userRouter = require('./app/user/route');
const chatRouter = require('./app/chat/route');
const customErrorHandler = require("./middleware/customErrorHandler");
const page404NotFound = require("./middleware/handler404NotFound");
var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/chat', chatRouter);

app.use(customErrorHandler);
app.use(page404NotFound);

module.exports = app;
