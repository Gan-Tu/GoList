const createError = require("http-errors");
var express = require("express");
var router = express.Router();

const { handleGetListsByOwnerUid } = require("./db");

router.route("/:owner_uid/lists").get(handleGetListsByOwnerUid);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.end("This API is working");
});

module.exports = router;
