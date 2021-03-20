const createError = require("http-errors");
const { Datastore } = require("@google-cloud/datastore");
const datastore = new Datastore();

function resolveKey(value) {
  if (datastore.isKey(value)) {
    return value;
  } else {
    return datastore.key(value);
  }
}

function allocateOneKey(incomplete_paths, callback) {
  datastore.allocateIds(resolveKey(incomplete_paths), 1, (err, keys) => {
    if (err) return callback(err);
    if (!keys) return callback(createError(500, "Failed to allocate any keys"));
    return callback(null, keys[0]);
  });
}

function getEntityByKey(paths, callback) {
  datastore.get(resolveKey(paths), (err, entity) => {
    if (err) {
      callback(createError(500, err.message));
    } else if (!entity) {
      callback(createError(404, `No entity found with key: [${paths}]`));
    } else {
      callback(null, entity);
    }
  });
}

function getEntityByQuery(query, callback) {
  datastore.runQuery(query, (err, entities) => {
    if (err) {
      callback(createError(500, err.message));
    } else {
      callback(null, entities);
    }
  });
}

function saveEntityByKey(paths, data, callback) {
  datastore.save(
    {
      key: resolveKey(paths),
      data: data,
    },
    function (err, apiResponse) {
      if (err) {
        callback(createError(500, err.message));
      } else {
        callback(null, apiResponse);
      }
    }
  );
}

function updateEntityByKey(paths, getUpdatedDataFn, callback) {
  const key = resolveKey(paths);

  // Start a transaction remotely
  const transaction = datastore.transaction();
  transaction.run((err) => {
    if (err) return callback(createError(500, err.message));

    // Get the existing entity
    transaction.get(key, (getError, entity) => {
      if (getError) {
        return callback(createError(500, getError.message));
      } else if (!entity) {
        return callback(
          createError(
            404,
            `Cannot update update. No item exists with: [${key.path}]`
          )
        );
      }

      // Save the updated entity with UPDATE method
      transaction.update({
        key: key,
        data: getUpdatedDataFn(entity),
      });

      // Commit transaction
      transaction.commit((commitError, apiResponse) => {
        if (commitError) {
          callback(createError(500, commitError.message));
        } else {
          callback(null, apiResponse);
        }
      });
    });
  });
}

function _deleteEntityHelper(keys, callback) {
  datastore.delete(keys, (err, apiResponse) => {
    if (err) {
      callback(createError(500, err.message));
    } else {
      callback(null, apiResponse);
    }
  });
}

function deleteEntityByKey(paths, callback) {
  _deleteEntityHelper(resolveKey(paths), callback);
}

function deleteEntityByQuery(query, callback) {
  getEntityByQuery(query, (err, entities) => {
    if (err) return callback(createError(500, err.message));
    _deleteEntityHelper(
      entities.map((entity) => entity[datastore.KEY]),
      callback
    );
  });
}

module.exports = {
  allocateOneKey,
  getEntityByKey,
  getEntityByQuery,
  saveEntityByKey,
  updateEntityByKey,
  deleteEntityByKey,
  deleteEntityByQuery,
};
