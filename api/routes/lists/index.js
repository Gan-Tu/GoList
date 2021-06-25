const createError = require("http-errors");
var express = require("express");
var router = express.Router();
var itemsRouter = require("./items");

const {
  getList,
  saveList,
  updateList,
  deleteList,
} = require("./db");

router.param("listName", function (req, res, next, listName) {
  if (!listName) {
    next(createError(400, "GoList name cannot be empty"));
  } else if (!listName.match(/^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$/)) {
    next(
      createError(
        400,
        "GoList name can only contain alphanumeric, or non-leading dash letters"
      )
    );
  } else {
    req.listName = listName;  // so other child routers can access it
    next();
  }
});

router
  .route("/:listName")
  .get(getList)
  .delete(deleteList)
  .put(updateList)
  .post(
    // vaildates essential fields exist
    function validateBody(req, res, next) {
      if (!req.body.title) {
        next(createError(400, "Missing title in request body"));
      } else if (!req.body.owner_uid) {
        next(createError(400, "Missing owner_uid in request body"));
      } else {
        next();
      }
    },
    saveList
  );


router.use("/:listName/items", itemsRouter);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.end("This API is working");
});

module.exports = router;
