const { Datastore } = require("@google-cloud/datastore");
const datastore = new Datastore();
const db_utils = require("../../utils/datastore_utils");

const LIST_KEY_KIND = "GoLists";
const ITEM_KEY_KIND = "GoListItems";

/* -------------------------------------------------------------------------- */
/*                                   LISTS                                    */
/* -------------------------------------------------------------------------- */

/** Get a list entity by its name */
function handleGetListByName(req, res, next) {
  db_utils.getEntityByKey([LIST_KEY_KIND, req.params.name], (err, data) => {
    if (err) return next(err);
    return res.json(data);
  });
}

/** Save a list entity by its name, or update it if it already exists. */
function handleSaveList(req, res, next) {
  db_utils.saveEntityByKey(
    /*paths=*/
    [LIST_KEY_KIND, req.params.name],
    /*data=*/
    {
      listName: req.params.name,
      created_by: req.body.created_by,
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
function handleUpdateList(req, res, next) {
  db_utils.updateEntityByKey(
    /*paths=*/
    [LIST_KEY_KIND, req.params.name],
    /*getUpdatedDataFn=*/
    (oldEntity) => {
      return {
        listName: req.params.name,
        title: req.body.title || oldEntity.title,
        update_date: new Date() || oldEntity.update_date,
        created_by: req.body.created_by || oldEntity.created_by,
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
function handleDeleteListByName(req, res, next) {
  db_utils.deleteEntityByKey([LIST_KEY_KIND, req.params.name], (err) => {
    if (err) return next(err);
    return res.json({ err: null, ok: true });
  });
}

/* -------------------------------------------------------------------------- */
/*                                   ITEMS                                    */
/* -------------------------------------------------------------------------- */

/** Get all items under a list entity by its list name */
function handleGetListItemsByName(req, res, next) {
  db_utils.getEntityByQuery(
    /*query=*/
    datastore
      .createQuery(ITEM_KEY_KIND)
      .hasAncestor(datastore.key([LIST_KEY_KIND, req.params.name])),
    /*callback=*/
    (err, entities) => {
      if (err) return next(err);
      return res.status(202).json({ err: null, ok: true, entities });
    }
  );
}

module.exports = {
  handleGetListByName,
  handleSaveList,
  handleUpdateList,
  handleDeleteListByName,
  handleGetListItemsByName,
};
