const createError = require("http-errors");
const { Datastore } = require("@google-cloud/datastore");
const datastore = new Datastore();

function getEntityByKey(paths, callback) {
  datastore.get(datastore.key(paths), (err, entity) => {
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
      key: datastore.key(paths),
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
  const key = datastore.key(paths);

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
  _deleteEntityHelper(datastore.key(paths), callback);
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
  getEntityByKey,
  getEntityByQuery,
  saveEntityByKey,
  updateEntityByKey,
  deleteEntityByKey,
  deleteEntityByQuery,
};
