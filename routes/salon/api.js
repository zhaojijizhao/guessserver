'use strict'
var express = require('express');
var router = express.Router();
var collection = require('../../model/collection');
var utils = require('../utils');

/* api listing. */

//最新竞猜
router.get('/test', function(req, res, next) {
  res.json({code: 200});
});

router.post('/user', function(req, res, next) {
  var body = utils.parsebody(req.body);
  utils.add('salonuser', body.user, function(result){
    res.json(body.user);
  }, res);
});

router.post('/survey', function(req, res, next) {
  var body = utils.parsebody(req.body);
  utils.add('salonsurvey', body.survey, function(result){
    res.json(body.survey);
  }, res);
});

router.post('/point', function(req, res, next) {
  var body = utils.parsebody(req.body);
  utils.add('salonpoint', body.point, function(result){
    res.json(body.point);
  }, res);
});



module.exports = router;
