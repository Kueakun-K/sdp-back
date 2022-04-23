var express = require('express');
var router = express.Router();

const Authorize = require('../authorize')
const {BookModel, UserModel, TokenModel, BookCommentModel, ThreadModel, LibraryModel} = require('../models')

/* GET home page. */
router.get('/', async (req, res) => {
  const rentbook = []
  if(req.session.user){
    var user = await UserModel.findOne({user_name: req.session.user})
    var rent = await LibraryModel.find({user_id: user._id, isRent: true})
    for(var i = 0; i<rent.length;i++){
      if(rent[i].endAt < Date.now())
        await LibraryModel.findByIdAndUpdate(rent[i]._id, {isRent: false})
    }
    const book_rent = await LibraryModel.find({user_id: user._id, isRent: true})
    if(book_rent.length != 0){
      for(var i = 0 ; i < book_rent.length ; i++){
        rentbook[i] = await BookModel.findById(book_rent[i].book_id)
      }
    }
  }
  const newbook = await BookModel.find().sort({createdAt: -1})
  const viewbook = await BookModel.find().sort({book_view: -1})
  const ratebook = await BookModel.find().sort({book_rate: -1})
  res.render('index', {
    rentbook: rentbook,
    newbook: newbook,
    viewbook: viewbook,
    ratebook: ratebook, 
    user: user
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

router.get('/addbook', (req, res) => {
  return res.render('addbook')
})


router.get('/postthread/:id', async (req, res) => {
  const book_id = req.params.id
  res.render('addthread',{book_id: book_id})
})

router.get('/bookrent/:id', async (req, res) => {
  const book_id = req.params.id
  const book = await BookModel.findOneAndUpdate({_id: book_id}, { $inc: { book_view : 1 }})
  const comment = await BookCommentModel.find({book_id: book_id})
  const user = await UserModel.findOne({user_name: req.session.user})
  const rent = await LibraryModel.findOne({book_id: book_id, user_id: user._id})
  const rate = Math.round(book.book_rate)
  const dayLeft = ((rent.endAt - Date.now()) / (24 * 60 * 60 * 1000))
  return res.render('book_rent',{
      user: req.session.user,
      book:book,
      book_comment: comment,
      rate: rate,
      rent: rent,
      dayLeft: dayLeft
      // dateNow: Date.now()
  })
})



router.get('/search', async (req, res) => {
  const bookname = req.query.bookname
  const result = await BookModel.find({book_name: {$regex: bookname}})
  if(req.session.user){
      var user = await UserModel.findOne({user_name: req.session.user})
  }
  res.render('book_show',{
      section: "SEARCH",
      book: result,
      user: user
    })
})

module.exports = router;
