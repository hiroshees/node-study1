var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// use session
let session = require("express-session");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var ajaxRouter = require("./routes/ajax");

var app = express();

// session setting
let session_option= {
  secret : "hogehoge",
  resave : false,
  saveUninitialized : false,
  cookie : {
    maxAge : 60 * 60 * 1000
  },
};
// set session to app
app.use(session(session_option));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/ajax',ajaxRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// set mongo db connection to app
let mongo = require("./modules/mongo");
app.set('Employees', mongo.Employees);
app.set('db', mongo.db);

module.exports = app;
