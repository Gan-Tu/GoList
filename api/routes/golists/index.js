var express = require("express");
var router = express.Router();

const {
  handleGetListByName,
  handleSaveList,
  handleUpdateList,
  handleDeleteListByName,
} = require("./db");
const { BadRequestError } = require("./../../utils/errors");

router.param("name", function (req, res, next, name) {
  if (!name || name.length <= 0) {
    next(new BadRequestError("GoList name cannot be empty"));
  } else if (!name.match(/^[a-zA-Z0-9]+[a-zA-Z0-9-]*$/)) {
    next(
      new BadRequestError(
        "GoList name can only contain alphanumeric, or non-leading dash letters"
      )
    );
  } else {
    next();
  }
});

function validateNew(req, res, next) {
  if (!req.body) {
    next(new BadRequestError("Missing request body"));
  } else if (!req.body.title || req.body.title.length <= 0) {
    next(new BadRequestError("Missing title in request body"));
  } else if (!req.body.owner || req.body.owner.length <= 0) {
    next(new BadRequestError("Missing owner in request body"));
  }
  next();
}

router
  .route("/:name")
  .get(handleGetListByName)
  .delete(handleDeleteListByName)
  .put(handleUpdateList)
  .post(
    // vaildates essential fields exist
    function validateBody(req, res, next) {
      if (!req.body.title || req.body.title.length <= 0) {
        next(new BadRequestError("Missing title in request body"));
      } else if (!req.body.owner || req.body.owner.length <= 0) {
        next(new BadRequestError("Missing owner in request body"));
      }
      next();
    },
    handleSaveList
  );

/* GET home page. */
router.get("/", function (req, res, next) {
  res.end("This API is working");
});

module.exports = router;
