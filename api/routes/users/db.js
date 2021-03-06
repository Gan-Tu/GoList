const { Datastore } = require("@google-cloud/datastore");
const datastore = new Datastore();
const db_utils = require("../../utils/datastore_utils");

const LIST_KEY_KIND = "GoLists";
const LIST_OWNER_UID_FIELD_NAME = "owner_uid";

/* -------------------------------------------------------------------------- */
/*                                   LISTS                                    */
/* -------------------------------------------------------------------------- */

/** Get all lists under same user UID. */
function handleGetListsByOwnerUid(req, res, next) {
  db_utils.getEntityByQuery(
    /*query=*/
    datastore
      .createQuery(LIST_KEY_KIND)
      .filter(LIST_OWNER_UID_FIELD_NAME, "=", req.params.owner_uid),
    /*callback=*/
    (err, lists) => {
      if (err) return next(err);
      return res.status(202).json({ err: null, ok: true, lists });
    }
  );
}

module.exports = {
  handleGetListsByOwnerUid,
};
