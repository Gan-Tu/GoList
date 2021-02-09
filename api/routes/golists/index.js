var express = require("express");
var router = express.Router();
var { handleGetListByName, handleSaveList, handleUpdateList } = require("./db");

router.param("name", function (req, res, next, name) {
  if (!name || name.length <= 0) {
    return res.status(400).json({ err: "GoList name cannot be empty" });
  } else if (!name.match(/^[a-zA-Z0-9]+[a-zA-Z0-9-]*$/)) {
    return res.status(400).json({
      err: "GoList name can only be alphanumeric, with non-leading dashes",
    });
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
