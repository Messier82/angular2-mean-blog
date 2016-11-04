var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bluebird = require('bluebird');

mongoose.Promise = bluebird;

var index = require('./routes/index');
var user = require('./routes/user');

var app = express();

mongoose.connect('mongodb://localhost/angular2-blog');

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api/user/', user);

// catch favicon requests and fake 200 code, to prevent error logging
app.get('/favicon.ico', function (req, res)
{
  res.sendStatus(200);
});

// catch 404 and forward to error handler
app.use(function (req, res, next)
{
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

var server = app.listen(3000, function ()
{
  var host = 'localhost';
  var port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});


module.exports = app;