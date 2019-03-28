'use strict'
var express = require('express');
var _ = require('lodash');
var router = express.Router();
var collection = require('../../model/collection');
var utils = require('../utils');
var spawn = require('child_process').spawn;
var path=require('path');

/* manage listing. */
//最新竞猜
router.post('/test', function(req, res, next) {
  res.json({code: 200});
});

module.exports = router;