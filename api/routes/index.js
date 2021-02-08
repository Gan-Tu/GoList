var express = require('express');
var router = express.Router();
const { Datastore } = require("@google-cloud/datastore");
const datastore = new Datastore();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Golist API' });
});

module.exports = router;
