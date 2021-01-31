var express = require("express");
var router = express.Router();

const { Datastore } = require("@google-cloud/datastore");
const datastore = new Datastore();
const urlMetadata = require("url-metadata");

router.get("/", function (req, res, next) {
  res.send("API is working properly");
});

router.get("/urls/get/:short_url", function (req, res, next) {
  datastore.get(
    datastore.key(["Urls", req.params.short_url]),
    function (err, entity) {
      if (err) {
        return next(err);
      } else if (!entity) {
        return res.status(400).send({ err: "no such entity", long_urls: null });
      }
      return res.json({ err: null, long_urls: entity.long_urls });
    }
  );
});

router.post("/urls/save/:short_url", function (req, res, next) {
  if (!req.body.long_urls || req.body.long_urls.length === 0) {
    return res
      .status(400)
      .send({ err: "At least one url must be sent in 'long_urls'" });
  }
  datastore.save(
    {
      key: datastore.key(["Urls", req.params.short_url]),
      data: {
        long_urls: req.body.long_urls,
      },
    },
    function (err, apiResponse) {
      if (err) {
        return next(err);
      }
      return res.json({ err: null, apiResponse });
    }
  );
});

router.get("/urls/fetchMetadata/:url", function (req, res, next) {
  urlMetadata(req.params.url).then(
    function (metadata) {
      res.json(metadata);
    },
    function (error) {
      next(error);
    }
  );
});

module.exports = router;
