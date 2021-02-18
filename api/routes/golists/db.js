const createError = require("http-errors");
const { Datastore } = require("@google-cloud/datastore");
const datastore = new Datastore();

/**
 * Get a list entity by its name
 *
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @param {Function} next Express next middleware function
 */
function handleGetListByName(req, res, next) {
  let name = req.params.name;
  datastore.get(datastore.key(["GoLists", name]), (err, entity) => {
    if (err) {
      next(createError(500, err.message));
    } else if (!entity) {
      next(createError(404, `No GoLists found with name: ${name}`));
    } else {
      res.json(entity);
    }
  });
}

/**
 * Save a list entity by its name, or update it if it already exists.
 *
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @param {Function} next Express next middleware function
 */
function handleSaveList(req, res, next) {
  let name = req.params.name;
  datastore.save(
    {
      key: datastore.key(["GoLists", name]),
      data: {
        listName: name,
        created_by: req.body.created_by,
        title: req.body.title,
        description: req.body.description,
        update_date: new Date(),
      },
    },
    function (err) {
      if (err) {
        next(createError(500, err.message));
      } else {
        res.status(201).json({ err: null, ok: true });
      }
    }
  );
}

/**
 * Update a list entity by its name, or error if it doesn't exit.
 *
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @param {Function} next Express next middleware function
 */
function handleUpdateList(req, res, next) {
  let name = req.params.name;
  let key = datastore.key(["GoLists", name]);

  const transaction = datastore.transaction();
  // Start a transaction remotely
  transaction.run((err) => {
    if (err) return next(createError(500, err.message));
    // Get the existing entity
    transaction.get(key, (err, entity) => {
      if (err) {
        return next(createError(500, err.message));
      } else if (!entity) {
        return next(createError(404, `No GoLists found with name: ${name}`));
      }
      // Save the updated entity with UPDATE method
      transaction.update({
        key: key,
        data: {
          listName: name,
          title: req.body.title || entity.title,
          update_date: new Date() || entity.update_date,
          created_by: req.body.created_by || entity.created_by,
          description: req.body.description || entity.description,
        },
      });
      // Commit transaction
      transaction.commit((err) => {
        if (err) {
          next(createError(500, err.message));
        } else {
          res.status(200).json({ err: null, ok: true });
        }
      });
    });
  });
}

/**
 * Delete a list entity by its name
 *
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @param {Function} next Express next middleware function
 */
function handleDeleteListByName(req, res, next) {
  let name = req.params.name;
  datastore.delete(datastore.key(["GoLists", name]), (err) => {
    if (err) {
      next(createError(500, err.message));
    } else {
      res.status(202).json({ err: null, ok: true });
    }
  });
}

/**
 * Get all items under a list entity by its list name
 *
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @param {Function} next Express next middleware function
 */
function handleGetListItemsByName(req, res, next) {
  let name = req.params.name;
  let query = datastore
    .createQuery("GoListItems")
    .hasAncestor(datastore.key(["GoLists", name]));
  datastore.runQuery(query, (err, entities) => {
    if (err) {
      next(createError(500, err.message));
    } else {
      res.status(202).json({ err: null, ok: true, entities });
    }
  });
}

module.exports = {
  handleGetListByName,
  handleSaveList,
  handleUpdateList,
  handleDeleteListByName,
  handleGetListItemsByName,
};
