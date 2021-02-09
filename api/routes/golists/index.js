var express = require("express");
var router = express.Router();

const {
  handleGetListByName,
  handleSaveList,
  handleUpdateList,
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

router
  .route("/:name")
  .get(handleGetListByName)
  .put(handleUpdateList)
  .post(handleSaveList);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.end("This API is working");
});

module.exports = router;
