const { Datastore } = require("@google-cloud/datastore");
const datastore = new Datastore();
const db_utils = require("../../utils/datastore_utils");

const LIST_KEY_KIND = "GoLists";
const ITEM_KEY_KIND = "GoListItems";

/* -------------------------------------------------------------------------- */
/*                                   LISTS                                    */
/* -------------------------------------------------------------------------- */

/** Get a list entity by its name */
function getListByName(req, res, next) {
  db_utils.getEntityByKey([LIST_KEY_KIND, req.params.listName], (err, data) => {
    if (err) return next(err);
    return res.json(data);
  });
}

/** Save a list entity by its name, or update it if it already exists. */
function saveList(req, res, next) {
  db_utils.saveEntityByKey(
    /*paths=*/
    [LIST_KEY_KIND, req.params.listName],
    /*data=*/
    {
      listName: req.params.listName,
      owner_uid: req.body.owner_uid,
      owner_display_name: req.body.owner_display_name,
      title: req.body.title,
      description: req.body.description,
      update_date: new Date(),
    },
    /*callback=*/
    (err) => {
      if (err) return next(err);
      res.status(201).json({ err: null, ok: true });
    }
  );
}

/** Update a list entity by its name, or error if it doesn't exit. */
function updateList(req, res, next) {
  db_utils.updateEntityByKey(
    /*paths=*/
    [LIST_KEY_KIND, req.params.listName],
    /*getUpdatedDataFn=*/
    (oldEntity) => {
      return {
        listName: req.params.listName,
        title: req.body.title || oldEntity.title,
        update_date: new Date() || oldEntity.update_date,
        owner_uid: req.body.owner_uid, // owner uid should be immutable for now
        owner_display_name:
          req.body.owner_display_name || oldEntity.owner_display_name,
        description: req.body.description || oldEntity.description,
      };
    },
    /*callback=*/
    (err) => {
      if (err) return next(err);
      res.status(201).json({ err: null, ok: true });
    }
  );
}

/** Delete a list entity by its name */
function deleteListByName(req, res, next) {
  db_utils.deleteEntityByQuery(
    /*query=*/ datastore
      .createQuery(ITEM_KEY_KIND)
      .hasAncestor(datastore.key([LIST_KEY_KIND, req.params.listName])),
    /*callback=*/
    (err) => {
      if (err) return next(err);
      db_utils.deleteEntityByKey([LIST_KEY_KIND, req.params.listName], (err2) => {
        if (err2) return next(err2);
        return res.status(202).json({ err: null, ok: true });
      });
    }
  );
}

/* -------------------------------------------------------------------------- */
/*                                   ITEMS                                    */
/* -------------------------------------------------------------------------- */

/** Get all items under a list entity by its list name */
function getListItemsByListName(req, res, next) {
  db_utils.getEntityByQuery(
    /*query=*/
    datastore
      .createQuery(ITEM_KEY_KIND)
      .hasAncestor(datastore.key([LIST_KEY_KIND, req.params.listName])),
    /*callback=*/
    (err, entities) => {
      if (err) return next(err);
      return res.status(202).json({ err: null, ok: true, entities });
    }
  );
}

module.exports = {
  getListByName,
  saveList,
  updateList,
  deleteListByName,
  getListItemsByListName,
};
