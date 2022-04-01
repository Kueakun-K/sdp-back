var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const methodOverride = require('method-override')


require('./db');


var indexRouter = require('./routes/index')
var apiRouter = require('./routes/api')
var bookRouter = require('./routes/book')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'))
app.use(methodOverride('_method'))

const oneDay = 1000 * 60 * 60 * 24

app.use(session({
  name: "SDP",
  secret: "sdp",
  saveUninitialized: true,
  cookie: { maxAge: oneDay },
  resave: true,
  store: new MongoDBStore({
    uri: 'mongodb+srv://t63010040:kritkuea4095@cluster0.jaj57.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    databaseName: 'myFirstDatabase',
    collection: 'MySession',
    expires: oneDay
  })
}))

app.use('/', indexRouter)
app.use('/api', apiRouter)
app.use('/book', bookRouter)

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

module.exports = app;
