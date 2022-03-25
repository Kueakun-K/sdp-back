var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs')

const {UserModel} = require('../models')

var session;

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
      session = req.session;
      session.userid = req.body.username;
      console.log(req.session)
      res.redirect('../main')
    }
  }
})

module.exports = router;
