var express = require('express');
var router = express.Router();

/* GET mobile page. */
router.get('/index', function(req, res, next) {
  res.render('engineer/cms/index', {
    path:"cms/index"
  });
});

module.exports = router;
