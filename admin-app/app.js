var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var logger = require("morgan");
var rateLimit = require("express-rate-limit");
var helmet = require("helmet");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));

// Set common HTTP headers for better security
app.use(helmet());

// rate limit the API server to 60 RPS
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 60,
    message: "Too many requests. Max 60 requests allowed per minute",
  })
);


app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "build")));

app.get("/*", function (req, res, next) {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
