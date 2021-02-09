var express = require("express");
var router = express.Router();

const { Datastore } = require("@google-cloud/datastore");
const datastore = new Datastore();

const VALID_NAME_PATTERN = /^[a-zA-Z0-9]+[a-zA-Z0-9-]*$/;

router.param("name", function (req, res, next, name) {
  if (!name || name.length <= 0) {
    return res.status(400).json({ err: "GoList name cannot be empty" });
  } else if (!name.match(VALID_NAME_PATTERN)) {
    return res.status(400).json({
      err: "GoList name can only be alphanumeric, with non-leading dashes",
    });
  } else {
    next();
  }
});

router.route("/:name").get(function (req, res, next) {
  let name = req.params.name;
  datastore.get(datastore.key(["GoLists", name]), (err, entity) => {
    if (err) {
      next(
        `Encountered error when fetching GoLists with name: ${name}. ${err}`
      );
    } else if (!entity) {
      return res.status(400).json({ err: `No GoLists found with name: ${name}` });
    } else {
      res.json(entity);
    }
  });
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.end("This API is working");
});

module.exports = router;
