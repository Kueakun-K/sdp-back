var express = require('express');
var router = express.Router();

const Authorize = require('../authorize')
const {BookModel, UserModel, TokenModel} = require('../models')

/* GET home page. */
router.get('/', async (req, res) => {
  const newbook = await BookModel.find().sort({createdAt: -1})
  const viewbook = await BookModel.find().sort({book_view: -1})
  const ratebook = await BookModel.find().sort({book_rate: -1})
  res.render('index', {
    newbook: newbook,
    viewbook: viewbook,
    ratebook: ratebook, 
    user: req.session.user
  })
})

router.get('/login', Authorize('/',false), (req, res) =>{
  res.render('index_login',{ 
    username: req.session.username,
    message: req.session.message_login 
  })
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

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

router.get('/test', async (req, res) => {
  res.render('error')
})


router.get('/addbook', (req, res) => {
  return res.render('addbook')
})


router.get('/manga', async (req, res) => {
  if(req.session.user){
    const user = await UserModel.findOne({user_name: req.session.user})
    const sort = user.book_sort
    if(sort == 'new')
      var book_manga = await BookModel.find({book_tag: 'manga'}).sort({createdAt: -1})
    else if(sort == 'view')
      var book_manga = await BookModel.find({book_tag: 'manga'}).sort({book_view: -1})
    else if(sort == 'rate')
      var book_manga = await BookModel.find({book_tag: 'manga'}).sort({book_rate: -1})
    else if(sort == 'name')
      var book_manga = await BookModel.find({book_tag: 'manga'}).sort({book_name: 1})
    return res.render('manga',{
      book: book_manga,
      user: req.session.user
    })
  }
  else{
    if(!req.session.sort){
      const book_manga = await BookModel.find({book_tag: 'manga'}).sort({createdAt: -1})
      return res.render('manga',{
        book: book_manga,
        user: req.session.user
      })
    }
    else{
      const sort = req.session.sort
      if(sort == 'new')
        var book_manga = await BookModel.find({book_tag: 'manga'}).sort({createdAt: -1})
      else if(sort == 'view')
        var book_manga = await BookModel.find({book_tag: 'manga'}).sort({book_view: -1})
      else if(sort == 'rate')
        var book_manga = await BookModel.find({book_tag: 'manga'}).sort({book_rate: -1})
      else if(sort == 'name')
        var book_manga = await BookModel.find({book_tag: 'manga'}).sort({book_name: 1})
      return res.render('manga',{
        book: book_manga,
        user: req.session.user
      })
    }
  }
})

module.exports = router;
