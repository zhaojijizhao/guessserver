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
  body.user.ip = req.ip;
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
  body.point.ip = req.ip;
  utils.add('salonpoint', body.point, function(result){
    res.json(body.point);
  }, res);
});

router.get('/d', function(req, res, next) {
  utils.searchpage('salonuser', {limit: 999, skip: 0}, function(result, count){
    const user = result.find((v) => {
      v.ip === req.ip;
    });
    if (user) {
      res.send("window.ip="+req.ip);
    } else {
      res.send("{}");
    }
  }, res);
});



module.exports = router;
