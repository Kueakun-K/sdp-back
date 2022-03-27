var express = require('express');
var router = express.Router();

const Authorize = require('../authorize')
const {BookModel} = require('../models')

/* GET home page. */
router.get('/', Authorize('main',false), async (req, res) => {
  const book = await BookModel.find().sort({book_name: 1})
  res.render('index', {book: book})
})

router.get('/login', Authorize('main',false), (req, res) =>{
  res.render('login')
})

router.get('/register', (req, res) =>{
  res.render('register')
})

router.get('/main', Authorize('/login',true), async (req, res) => {
  const book = await BookModel.find().sort({book_name: 1})
  res.render('main', {user: req.session.user, book: book})
})

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

router.get('/addbook', (req, res) => [
  res.render('addbook')
])
module.exports = router;
