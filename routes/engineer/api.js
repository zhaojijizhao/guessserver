'use strict'
var express = require('express');
var router = express.Router();
var collection = require('../../model/collection');
var utils = require('../utils');

/* api listing. */

//最新竞猜
router.post('/test', function(req, res, next) {
  res.json({code: 200});
});

module.exports = router;
