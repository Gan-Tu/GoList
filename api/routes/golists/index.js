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

function validateEntityInReqBody(req, _, next) {
  if (!req.body) {
    next(new BadRequestError("Missing request body"));
  } else if (!req.body.title || req.body.title.length <= 0) {
    next(new BadRequestError("Missing title in request body"));
  } else if (!req.body.owner || req.body.owner.length <= 0) {
    next(new BadRequestError("Missing owner in request body"));
  } else {
    next();
  }
}

router
  .route("/:name")
  .get(handleGetListByName)
  .put(validateEntityInReqBody, handleUpdateList)
  .post(validateEntityInReqBody, handleSaveList);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.end("This API is working");
});

module.exports = router;
