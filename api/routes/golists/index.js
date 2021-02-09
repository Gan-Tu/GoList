var express = require("express");
var router = express.Router();
const { Datastore } = require("@google-cloud/datastore");
const { all } = require(".");
const datastore = new Datastore();

/* GET home page. */
router
  .route("/:name")
  .get(function (req, res, next) {
    if (!req.params.name && req.params.name.length <= 0) {
      return res.status(400).json({ err: "name cannot be empty" });
    }
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
