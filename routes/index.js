var express = require('express');
var router = express.Router();

const isLoggedIn = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index')
})

router.get('/login', (req, res) =>{
  res.render('login')
})

router.get('/register', (req, res) =>{
  res.render('register')
})

router.get('/main', isLoggedIn,function(req, res, next) {
  res.render('main', {user: req.session.user})
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})
module.exports = router;
