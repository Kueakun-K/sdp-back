var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const {UserModel} = require('./models')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

//----------------------------------------------//

// passport.use(
//   new LocalStrategy((username, password, cb) => {
//     UserModel.findOne({ user_name:username }, (err, user) => {
//       if (err) {
//         return cb(err);
//       }
//       if (!user) {
//         return cb(null, false);
//       }

//       if (bcrypt.compareSync(password, user.user_password)) {
//         return cb(null, user);
//       }
//       return cb(null, false);
//     })
//   })
// )

//----------------------------------------------//

// passport.serializeUser((user, cb) => {
//   cb(null, user._id);
// });

// passport.deserializeUser((id, cb) => {
//   UserModel.findById(id, (err, user) => {
//     if (err) {
//       return cb(err);
//     }
//     cb(null, user);
//   });
// });

//----------------------------------------------//

require('./db');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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

app.use('/', indexRouter);
app.use('/auth', authRouter);

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
