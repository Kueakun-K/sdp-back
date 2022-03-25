var express = require('express');
var router = express.Router();

const Authorize = require('../authorize')

/* GET home page. */
router.get('/', Authorize('main',false), function(req, res, next) {
  res.render('index')
})

router.get('/login', Authorize('main',false), (req, res) =>{
  res.render('login')
})

router.get('/register', (req, res) =>{
  res.render('register')
})

router.get('/main', Authorize('/login',true), (req, res) => {
  res.render('main', {user: req.session.user})
})

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})
module.exports = router;
