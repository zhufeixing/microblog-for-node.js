var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
var session    = require('express-session');
var MongoStore = require('connect-mongo')(session);
var settings = require('./settings');
var flash= require('connect-flash');
var index = require('./routes/index');
var u = require('./routes/u');
var post = require('./routes/post');
var reg = require('./routes/reg');
var doReg = require('./routes/doReg');
var login = require('./routes/login');
var doLogin = require('./routes/doLogin');
var logout = require('./routes/logout');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);
app.use(flash());

app.use(session({
  secret: settings.cookieSecret,
  key: settings.db,//cookie name
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    /*db: settings.db,
    host: settings.host,
    port: settings.port*/
    url: 'mongodb://localhost/microblog'
  })
}));

app.use(function(req, res, next){
      console.log("app.usr local");
      res.locals.user = req.session.user;
      res.locals.post = req.session.post;
      var error = req.flash('error');
      res.locals.error = error.length ? error : null;

      var success = req.flash('success');
      res.locals.success = success.length ? success : null;
      next();
    });

app.use('/', index);
app.use('/u', u);
app.use('/post',post);
app.use('/reg',reg);
app.use('/doReg',doReg);
app.use('/login',login);
app.use('/doLogin',doLogin);
app.use('logout',logout);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;
