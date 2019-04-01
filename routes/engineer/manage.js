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


router.post('/user', function(req, res, next) {
  var body = utils.parsebody(req.body);
  utils.searchpage('engineeruser', {limit: body.limit || 10, skip: body.skip || 0}, function(result, count){
    res.json({list:result, count: count});
  }, res);
});

router.post('/survey', function(req, res, next) {
  var body = utils.parsebody(req.body);
  utils.searchpage('engineersurvey', {limit: body.limit || 10, skip: body.skip || 0}, function(result, count){
    res.json({list:result, count: count});
  }, res);
});

router.post('/point', function(req, res, next) {
  var body = utils.parsebody(req.body);
  utils.searchpage('engineerpoint', {limit: body.limit || 10, skip: body.skip || 0}, function(result, count){
    res.json({list:result, count: count});
  }, res);
});


module.exports = router;