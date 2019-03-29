var express = require('express');
var router = express.Router();

/* GET web page. */
router.get('/index', function(req, res, next) {
  if (req.headers.referer && req.headers.referer.indexOf('engineer') > -1) {
  	res.render('engineer/h5/index', {
	    path:"engineer/h5/index"
	  });
  } else {
  res.render('web/index', {
    path:"web/index"
  });
}
});

module.exports = router;
