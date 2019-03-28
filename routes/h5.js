var express = require('express');
var router = express.Router();

/* GET h5 page. */
router.get('/index', function(req, res, next) {
  res.render('h5/index', {
    path:"h5/index"
  });
});

module.exports = router;
