const { Datastore } = require("@google-cloud/datastore");
const datastore = new Datastore();

/**
 * Get a list entity by its name
 *
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @param {Function} next Express next middleware function
 * @param {string} name The name of the new list
 */
function handleGetListByName(req, res, next) {
  let name = req.params.name;
  datastore.get(datastore.key(["GoLists", name]), (err, entity) => {
    if (err) {
      next(
        `Encountered error when fetching GoLists with name: ${name}. ${err}`
      );
    } else if (!entity) {
      res.status(400).json({ err: `No GoLists found with name: ${name}` });
    } else {
      res.json(entity);
    }
  });
}

/**
 * An internal helper function to save a list entity.
 *
 * @param {string} name The name of the list to save.
 * @param {string} method Explicit method to use: 'insert', 'update', 'upsert'
 * @param {Function} callback Callback function to handle database save results
 */
function _saveList(name, data, method, callback) {
  datastore.save(
    {
      key: datastore.key(["GoLists", name]),
      method: method,
      data: {
        name: name,
        title: data.title,
        create_date: new Date(),
        last_modified_date: new Date(),
        owner: data.owner || "Admin",
        hits: data.hits || 0,
      },
    },
    callback
  );
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
  _saveList(name, req.body, /** method */ "upsert", function (err) {
    if (err) {
      res.status(500).json({ err: `error: ${err.message}`, ok: false });
    } else {
      res.status(201).json({ err: null, ok: true });
    }
  });
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
  _saveList(name, req.body, /** method */ "update", function (err) {
    if (err && err.code === /** NOT_FOUND */ 5) {
      res.status(404).json({
        err: `GoLists with name does not exists: ${name}`,
        ok: false,
      });
    } else if (err) {
      res.status(500).json({ err: `error: ${err.message}`, ok: false });
    } else {
      res.status(200).json({ err: null, ok: true });
    }
  });
}

module.exports = { handleGetListByName, handleSaveList, handleUpdateList };
