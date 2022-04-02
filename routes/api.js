var express = require('express')
var router = express.Router()
const bcrypt = require('bcryptjs')
const nodemailer = require("nodemailer")
const crypto = require('crypto')

const {UserModel, TokenModel} = require('../models')


router.post('/register', async (req, res) => {
  const { username, password, repassword, email} = req.body;

  if (!username || !password || !repassword || !email){
    return res.render('index_register', { message: 'Please try again' });
  }

  const checkusername = await UserModel.findOne({user_name:username})
  if(checkusername){
    return res.render('index_register', { message: 'Username ซ้ำ' });
  }

  const checkemail = await UserModel.findOne({user_email:email})
  if(checkemail){
    return res.render('index_register', { message: 'Email ซ้ำ' });
  }

  if( password == repassword){
    const passwordHash = bcrypt.hashSync(password, 10)
    const user = new UserModel({
      user_name: username,
      user_password: passwordHash,
      user_email: email,
     
    })
    await user.save()
    return res.redirect('../login')
  }
})

router.post('/login', async (req, res) => {
  const {username , password} = req.body

  if(!username || !password){
    // req.session.username = username
    req.session.message_login = "Username or Password invalid"
    res.redirect('../login')
  }

  const user = await UserModel.findOne({user_name: username})
  if(user){
    const isCorrect = bcrypt.compareSync(password, user.user_password)
    if(isCorrect){
      if(req.session.username){
        delete req.session.username
      }
        
      if(req.session.message_login){
        delete req.session.message_login
      }   
      req.session.user = username
      req.session.isLogin = true
      if(!req.session.book){
        return res.redirect('../')
      }
      const bookid = req.session.book
      delete req.session.book
      return res.redirect(`../book/${bookid}`)
      
    }
    else{
      req.session.username = username
      req.session.message_login = "Username or Password invalid"
      return res.redirect('../login')
    }
  }
  else{
    req.session.username = username
    req.session.message_login = "Username or Password invalid"
    return res.redirect('../login')
  }
})

router.get('/mail', async (req, res) => {
  const email = req.query.email
  
  const checkemail = await UserModel.findOne({user_email: email})
  if(!checkemail){
    return res.render('index_forgotpassword',{ message: 'ไม่มี Email นี้' })
  }
  else{
    let token = await TokenModel.findOne({user_id: checkemail._id})
    if(!token){
      token = await new TokenModel({
        user_id: checkemail._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save()
    }

    let transporter = nodemailer.createTransport({
      host: 'gmail',
      service: 'Gmail',
      auth: {
          user: 'aheylibrary@gmail.com',
          pass: 'Ahey_123456789',
      }
    })

    const mailOptions = {
      from: 'Ahey Library <aheylibrary@gmail.com>',   
      to: `คุณ ${checkemail.user_name} <${email}>`,
      subject: "สวัสดีจ้า",                     
      html: "<b>Test Test</b>" + 
            `<a href='http://localhost:3000/password-reset/${checkemail._id}/${token.token}'>Cilck Here</a>`
    }

    transporter.sendMail(mailOptions, function (err, info) {
      if(err){
        return res.render('index_forgotpassword',{ message: 'Error' })
      }
      else{
        return res.render('index_forgotpassword',{ message: 'ส่งไปที่ Email เรียบร้อย' })
      }
    })
  }
})

router.post('/reset-password', async (req, res) => {
  const {user_id, password, repassword} = req.body

  if( password == repassword){
    const passwordHash = bcrypt.hashSync(password, 10)
    await UserModel.findByIdAndUpdate(user_id,{user_password: passwordHash})
    return res.redirect('../login')
  }
})


module.exports = router;
