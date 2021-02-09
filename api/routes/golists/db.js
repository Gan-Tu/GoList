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
        name: name,
        title: req.body.title,
        last_modified_date: new Date(),
        owner: req.body.owner,
        hits: req.body.hits || 0,
      },
    },
    function (err) {
      if (err) {
        next(new InternalError(err.message));
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
    if (err) next(new InternalError(err.message));
    // Get the existing entity
    transaction.get(key, (err, entity) => {
      if (err) {
        next(new InternalError(err.message));
      } else if (!entity) {
        next(new NotFoundError(`No GoLists found with name: ${name}`));
      }
      let updatedEntity = {
        key: key,
        data: {
          name: name,
          title: req.body.title || entity.title,
          last_modified_date: new Date() || entity.last_modified_date,
          owner: req.body.owner || entity.owner,
          hits: req.body.hits || entity.hits,
        },
      };
      // Save the updated entity with UPDATE method
      datastore.update(updatedEntity, (err) => {
        if (err) {
          next(new InternalError(err.message));
        } else {
          res.status(200).json({ err: null, ok: true });
        }
      });
      // Commit transaction
      transaction.commit((err) => {
        if (err) next(new InternalError(err.message));
      });
    });
  });
}

module.exports = { handleGetListByName, handleSaveList, handleUpdateList };
