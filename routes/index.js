var express = require('express');
var router = express.Router();

const Authorize = require('../authorize')
const {BookModel, UserModel, TokenModel} = require('../models')

/* GET home page. */
router.get('/', Authorize('main',false), async (req, res) => {
  const book = await BookModel.find().sort({book_name: 1})
  res.render('index', {book: book})
})

router.get('/login', Authorize('main',false), (req, res) =>{
  res.render('index_login',{ message: '' })
})

router.get('/register', (req, res) =>{
  res.render('index_register',{ message: '' })
})

router.get('/forgotpassword', (req, res) => {
  res.render('index_forgotpassword',{ message: '' })
})

router.get('/password-reset/:user_id/:token', async (req, res) => {
  const user = await UserModel.findById(req.params.user_id)
  if (!user)
    return res.status(400).send("ไม่มี User นี้");
  const token = await TokenModel.findOne({user_id: req.params.user_id, token: req.params.token})
  if (!token)
    return res.status(400).send("Link หมดอายุ");
  
  res.render('reset-password',{user_id: user._id})
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

router.get('/test', (req, res) => {
  res.render('index_login')
})


module.exports = router;
