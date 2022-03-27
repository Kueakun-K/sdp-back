var express = require('express')
var router = express.Router()
const bcrypt = require('bcryptjs')

const {UserModel, BookModel} = require('../models')

/* GET users listing. */
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
  const book = await BookModel.findOne({_id: book_id})
  res.render('book',{book:book})
})

router.put('/book', async (req, res) => {
  const book_id = req.body.id
  const {book_name, book_tag, book_description, book_price} = req.body
  const data = {book_name, book_tag, book_description, book_price}
  const book = await BookModel.findOneAndUpdate({_id: book_id},data)
  res.redirect('../main')
  // res.render('book', {book:book})
})
module.exports = router;
