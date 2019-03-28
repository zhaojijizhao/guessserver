var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var api = require('./routes/api');
var manage = require('./routes/manage');
var h5 = require('./routes/h5');
var web = require('./routes/web');
var cms = require('./routes/cms');
//engineer
var engineerh5 = require('./routes/engineer/h5');
var engineercms = require('./routes/engineer/cms');
var engineermanage = require('./routes/engineer/manage');
var engineerapi = require('./routes/engineer/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(function(req, res, next) {
  var result = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
  next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', api);
app.use('/manage', manage);
app.use('/cms', cms);
app.use('/h5', h5);
app.use('/web', web);
//engineer
app.use('/engineer/h5', engineerh5);
app.use('/engineer/cms', engineercms);
app.use('/engineer/manage', engineermanage);
app.use('/engineer/api', engineerapi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('public/error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('public/error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
