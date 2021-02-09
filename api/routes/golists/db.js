const { Datastore } = require("@google-cloud/datastore");
const datastore = new Datastore();

const { InternalError, NotFoundError } = require("./../../utils/errors");

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
      next(new InternalError(err.message));
    } else if (!entity) {
      next(new NotFoundError(`No GoLists found with name: ${name}`));
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
        last_modified_date: new Date(),
        owner: data.owner,
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
      next(new InternalError(err.message));
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
    if (err) {
      if (err.code === /** google.rpc.Code.NOT_FOUND */ 5) {
        next(new NotFoundError(`No GoLists found with name: ${name}`));
      } else {
        next(new InternalError(err.message));
      }
    } else {
      res.status(200).json({ err: null, ok: true });
    }
  });
}

module.exports = { handleGetListByName, handleSaveList, handleUpdateList };
