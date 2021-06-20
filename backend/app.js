var createError = require("http-errors");
var express = require("express");
var cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var rateLimit = require("express-rate-limit");
var helmet = require("helmet");
var bearerToken = require("express-bearer-token");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var listsRouter = require("./routes/lists");

var { decodeIDToken } = require("./configs/auth");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Set common HTTP headers for better security
app.use(helmet());

// rate limit the API server to 50 RPS
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 50,
    message: "Too many requests. Max 50 requests allowed per minute",
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// Extract bearer token from one of the following places:
// - The key access_token in the request body.
// - The key access_token in the request params.
// - The value from the header Authorization: Bearer <token>.
// The result token is saved at req.token
app.use(bearerToken());

if (process.env.NODE_ENV === "production") {
  // Allow CORS from our own domain
  const CORS_WHITELIST = [
    "https://goli.st",
    "https://www.goli.st",
    "https://app.goli.st",
    "https://api.goli.st",
    "https://golist.wl.r.appspot.com",
    "https://admin-app-dot-golist.wl.r.appspot.com",
    "https://api-golist.wl.r.appspot.com",
  ];
  app.use(
    cors({
      origin: CORS_WHITELIST,
      // some legacy browsers (IE11, various SmartTVs) choke on 204
      optionsSuccessStatus: 200,
    })
  );

  // Only performs authorizations and decode Bearer token in production
  app.use(decodeIDToken);
} else {
  app.use(cors()); // allow all origins
}

app.use("/users", usersRouter);
app.use("/lists", listsRouter);
app.use("/", indexRouter); // catch all

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
