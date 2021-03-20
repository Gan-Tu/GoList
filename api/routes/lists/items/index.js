const { Datastore } = require("@google-cloud/datastore");
const datastore = new Datastore();

const createError = require("http-errors");
var express = require("express");
var router = express.Router();

const {
  getAllItems,
  getSingleItem,
  addItem,
  updateItem,
  deleteItem,
} = require("./db");

router.param("itemId", function (req, res, next, itemId) {
  if (!itemId) {
    next(createError(400, "GoList id cannot be empty"));
  } else {
    req.params.itemId = datastore.int(itemId);
    next();
  }
});

// vaildates essential fields exist
function validatePostBody(req, res, next) {
  if (!req.body.title) {
    next(createError(400, "Missing title in request body"));
  } else if (!req.body.owner_uid) {
    next(createError(400, "Missing owner_uid in request body"));
  } else if (!req.body.link) {
    next(createError(400, "Missing link in request body"));
  } else {
    next();
  }
}

router.get("/", getAllItems).post("/", validatePostBody, addItem);

router.route("/:itemId").get(getSingleItem).delete(deleteItem).put(updateItem);

module.exports = router;
