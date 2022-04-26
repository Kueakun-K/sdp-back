var express = require('express');
var router = express.Router();

const Authorize = require('../authorize')
const {BookModel, UserModel, TokenModel, BookCommentModel, ThreadModel, LibraryModel, BookContentModel} = require('../models')

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
  const pricebook = await BookModel.find().sort({book_price: 1})
  const ratebook = await BookModel.find().sort({book_rate: -1})
  var num1 = 6
  if(newbook.length <6){
    num1 = newbook.length
  }
  res.render('index', {
    rentbook: rentbook,
    newbook: newbook,
    pricebook: pricebook,
    ratebook: ratebook,
    num: num1, 
    user: user
  })
})

router.get('/login', Authorize('/',false), (req, res) =>{
  res.render('index_login',{ 
    message: req.flash('error-login')
  })
})

router.get('/register', (req, res) =>{
  res.render('index_register',{ 
    message: req.flash('error-register') 
  })
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
  req.session.destroy( (err,g)=>{
    res.redirect('/')
  })
  
})


router.get('/board', async (req, res) =>{
  const board = await UserModel.find({user_Role: "User"}).sort({user_point: -1})
  if(req.session.user){
    var user = await UserModel.findOne({user_name: req.session.user})
  }
  res.render('board',{
    user: user,
    board: board
  })
})

router.get('/search', async (req, res) => {
  const bookname = req.query.bookname
  
  if(req.session.user){
      const user = await UserModel.findOne({user_name: req.session.user})
      const sort = user.book_sort
      if(sort == 'new')
        var result = await BookModel.find({book_name: {$regex: bookname}}).sort({createdAt: -1})
      else if(sort == 'view')
        var result = await BookModel.find({book_name: {$regex: bookname}}).sort({book_view: -1})
      else if(sort == 'rate')
        var result = await BookModel.find({book_name: {$regex: bookname}}).sort({book_rate: -1})
      else if(sort == 'name')
        var result = await BookModel.find({book_name: {$regex: bookname}}).sort({book_name: 1})
      return res.render('book_show',{
        section: "SEARCH",
        book: result,
        user: user
      })
  }
  else{
    if(!req.session.sort){
      var result = await BookModel.find({book_name: {$regex: bookname}}).sort({createdAt: -1})
      return res.render('book_show',{
        section: "SEARCH",
        book: result,
        user: user
      })
    }
    else{
      const sort = req.session.sort
      if(sort == 'new')
        var result = await BookModel.find({book_name: {$regex: bookname}}).sort({createdAt: -1})
      else if(sort == 'view')
        var result = await BookModel.find({book_name: {$regex: bookname}}).sort({book_view: -1})
      else if(sort == 'rate')
        var result = await BookModel.find({book_name: {$regex: bookname}}).sort({book_rate: -1})
      else if(sort == 'name')
        var result = await BookModel.find({book_name: {$regex: bookname}}).sort({book_name: 1})
      return res.render('book_show',{
        section: "SEARCH",
        book: result,
        user: user
      })
    }
  }
  
})

router.get('/payment/:id', async (req, res) => {
  const user_id = req.params.id
  const user = await UserModel.findById(user_id)
  res.render('payment',{
    user: user
  })
})

router.get('/read/:id', async (req, res) =>{
  const book_id = req.params.id
  if(req.session.user){
    var user = await UserModel.findOne({user_name: req.session.user})
  }
  const library = await LibraryModel.findOneAndUpdate({user_id: user._id, book_id: book_id},{lastread: Date.now()})
  const book = await BookContentModel.find({book_id: book_id}).sort({index: 1})
  const dayLeft = Math.floor((library.endAt - Date.now()) / ( 60 * 60 * 1000))

  res.render('read',{
    user:user,
    book:book,
    scroll:library.readOn,
    dayleft:dayLeft
  })
})



router.get('/test', async (req, res) => {
  req.flash('success', 'Welcome!!')
  res.redirect('/test1')
})

router.get('/test1',  async (req, res) => {
  // const book_id = req.params.id
  // const book = await BookContentModel.find({book_id: book_id}).sort({index: 1})
  res.render('test',{
    message: req.flash('success')
    // book: book
  })
})
module.exports = router;
