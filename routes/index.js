var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/login', (req, res) =>{
  res.render('login')
})

router.get('/register', (req, res) =>{
  res.render('register')
})

router.get('/main', (req,res) => {
  console.log(req.cookies.SDP)
  console.log(req.sessionID)
  console.log(req.session.id)
  res.render('main')
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})
module.exports = router;
