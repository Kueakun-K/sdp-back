var express = require('express')
var router = express.Router()
const bcrypt = require('bcryptjs')

const {UserModel, BookModel} = require('../models')

var fs = require('fs');
var path = require('path')


var multer = require('multer');
  
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, (__dirname,'./public/images') )
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
  
var upload = multer({ storage: storage });


router.post('/register', async (req, res) => {
  const { username, password, repassword, email } = req.body;

  if (!username || !password || !repassword || !email ){
    return res.render('register', { message: 'Please try again' });
  }

  if( password == repassword){
    const passwordHash = bcrypt.hashSync(password, 10)
    const user = new UserModel({
      user_name: username,
      user_password: passwordHash,
      user_email: email
    })
    await user.save()
    res.render('index')
  }
})

router.post('/login', async (req, res) => {
  const {username , password} = req.body

  if(!username || !password){
    return res.render('login')
  }

  const user = await UserModel.findOne({user_name: username})
  if(user){
    const isCorrect = bcrypt.compareSync(password, user.user_password)
    if(isCorrect){
      req.session.user = req.body.username;
      req.session.isLogin = true
      res.redirect('../main')
    }
  }
})

router.get('/book', async (req, res) => {
  const book_id = req.query.id
  console.log(book_id)
  const book = await BookModel.findOneAndUpdate({_id: book_id}, { $inc: { book_view : 1 }})
  res.render('book',{book:book})
})

router.post('/book', upload.single('img'), async (req, res) => {
  var obj = {
    book_name: req.body.book_name,
    book_tag: req.body.book_tag,
    book_description: req.body.book_description,
    book_price: req.body.book_price,
    book_img: {
          data: fs.readFileSync(path.join(__dirname,'../public/images/' + req.file.filename)),
          contentType: 'image/png'
      }
  }
  BookModel.create(obj, (err, item) => {
      if (err) {
          console.log(err);
      }
      else {
          res.redirect('../main');
      }
  });
})

router.put('/book', async (req, res) => {
  const book_id = req.body.id
  const {book_name, book_tag, book_description, book_price} = req.body
  const data = {book_name, book_tag, book_description, book_price}
  await BookModel.findOneAndUpdate({_id: book_id},data)
  res.redirect('../main')
})

router.delete('/book', async (req, res) => {
  const book_id = req.body.id
  await BookModel.findOneAndDelete({_id:book_id})
  res.redirect('../main')
})

router.get('/search', async (req, res) => {
  const bookname = req.query.bookname
  const result = await BookModel.find({book_name: {$regex: bookname}})
  res.render('search',{book: result})
})


module.exports = router;
