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
  let query = datastore
    .createQuery("GoLists")
    .filter("name", "=", req.params.name);
  datastore.runQuery(query, (err, entities) => {
    if (err) {
      next(
        `Encountered error when fetching Key(GoLists, name="${req.params.name}"): ${err}`
      );
    } else if (!entities.length) {
      res
        .status(404)
        .json({ err: `No GoLists with name found: ${req.params.name}` });
    } else {
      res.json({ data: entities });
    }
  });
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.end("This API is working");
});

module.exports = router;
