const createError = require("http-errors");
var express = require("express");
var router = express.Router();

const {
  getListByName,
  saveList,
  updateList,
  deleteListByName,
  getListItemsByName,
} = require("./db");

router.param("name", function (req, res, next, name) {
  if (!name || name.length <= 0) {
    next(createError(400, "GoList name cannot be empty"));
  } else if (!name.match(/^[a-zA-Z0-9]+[a-zA-Z0-9-]*$/)) {
    next(
      createError(
        400,
        "GoList name can only contain alphanumeric, or non-leading dash letters"
      )
    );
  } else {
    next();
  }
});

router
  .route("/:name")
  .get(getListByName)
  .delete(deleteListByName)
  .put(updateList)
  .post(
    // vaildates essential fields exist
    function validateBody(req, res, next) {
      if (!req.body.title || req.body.title.length <= 0) {
        next(createError(400, "Missing title in request body"));
      } else if (!req.body.owner_uid || req.body.owner_uid.length <= 0) {
        next(createError(400, "Missing owner_uid in request body"));
      } else {
        next();
      }
    },
    saveList
  );

router.route("/:name/items").get(getListItemsByName);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.end("This API is working");
});

module.exports = router;
