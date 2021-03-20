const { Datastore } = require("@google-cloud/datastore");
const datastore = new Datastore();
const db_utils = require("../../../utils/datastore_utils");
const createError = require("http-errors");

const LIST_KEY_KIND = "GoLists";
const ITEM_KEY_KIND = "GoListItems";

/** Get all items under a list entity by its list name */
function getAllItems(req, res, next) {
  db_utils.getEntityByQuery(
    datastore
      .createQuery(ITEM_KEY_KIND)
      .hasAncestor(datastore.key([LIST_KEY_KIND, req.listName])),
    (err, entities) => {
      if (err) return next(err);
      return res.status(202).json({ err: null, ok: true, entities });
    }
  );
}

/** Get an item entity by its ID */
function getSingleItem(req, res, next) {
  console.log([LIST_KEY_KIND, req.listName, ITEM_KEY_KIND, req.params.itemId]);
  db_utils.getEntityByKey(
    [LIST_KEY_KIND, req.listName, ITEM_KEY_KIND, req.params.itemId],
    (err, data) => {
      if (err) {
        return next(
          createError(err.statusCode, `GoList Item not found: ${err.message}`)
        );
      }
      return res.json(data);
    }
  );
}

/** Add a new item entity with randomly assigned ID. */
function addItem(req, res, next) {
  db_utils.saveEntityByKey(
    [LIST_KEY_KIND, req.listName, ITEM_KEY_KIND],
    {
      owner_uid: req.body.owner_uid,
      owner_display_name: req.body.owner_display_name,
      title: req.body.title,
      description: req.body.description,
      image_url: req.body.image_url,
      link: req.body.link,
      tags: req.body.tags || [],
      update_date: new Date(),
    },
    (err, apiResponse) => {
      if (err) return next(err);
      res.status(201).json({ err: null, ok: true, apiResponse });
    }
  );
}

/** Update an item entity by its ID, or error if it doesn't exit. */
function updateItem(req, res, next) {
  db_utils.updateEntityByKey(
    [LIST_KEY_KIND, req.listName, ITEM_KEY_KIND, req.params.itemId],
    (oldEntity) => {
      return {
        owner_display_name:
          req.body.owner_display_name || oldEntity.owner_display_name,
        title: req.body.title || oldEntity.title,
        description: req.body.description || oldEntity.description,
        image_url: req.body.image_url || oldEntity.image_url,
        link: req.body.link || oldEntity.link,
        tags: req.body.tags || oldEntity.tags,
        // immutable or auto-updated fields
        update_date: new Date(),
        owner_uid: oldEntity.owner_uid,
      };
    },
    /*callback=*/
    (err) => {
      if (err) return next(err);
      res.status(201).json({ err: null, ok: true });
    }
  );
}

/** Delete an item entity by its ID */
function deleteItem(req, res, next) {
  db_utils.deleteEntityByKey(
    [LIST_KEY_KIND, req.listName, ITEM_KEY_KIND, req.params.itemId],
    (err) => {
      if (err) return next(err);
      return res.status(202).json({ err: null, ok: true });
    }
  );
}

module.exports = {
  getAllItems,
  getSingleItem,
  addItem,
  updateItem,
  deleteItem,
};
