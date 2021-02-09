const { Datastore } = require("@google-cloud/datastore");
const datastore = new Datastore();

function handleGetListByName(req, res, next) {
  let name = req.params.name;
  datastore.get(datastore.key(["GoLists", name]), (err, entity) => {
    if (err) {
      next(
        `Encountered error when fetching GoLists with name: ${name}. ${err}`
      );
    } else if (!entity) {
      return res
        .status(400)
        .json({ err: `No GoLists found with name: ${name}` });
    } else {
      res.json(entity);
    }
  });
}

module.exports = { handleGetListByName };
