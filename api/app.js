var createError = require("http-errors");
var express = require("express");
var cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var logger = require("morgan");
var rateLimit = require("express-rate-limit");

var indexRouter = require("./routes/index");
var goListsRouter = require("./routes/golists");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// rate limit the API server to 50 RPS
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 50,
    message: "Too many requests. Max 50 requests allowed per minute",
  })
);

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Allow CORS from our own domain
app.use(
  cors({
    origin: [
      /goli\.st$/,
      /golist\.wl\.r\.appspot\.com$/,
      /localhost:\d+$/
    ],
    // some legacy browsers (IE11, various SmartTVs) choke on 204
    optionsSuccessStatus: 200,
  })
);

app.use("/golists", goListsRouter);
app.use("/users", usersRouter);
app.use("/*", indexRouter); // catch all

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // return the error message
  res.status(err.statusCode || 500).json({ err: err.message, ok: false });
});

module.exports = app;
