var express = require('express')
var router = express.Router()
const bcrypt = require('bcryptjs')
const nodemailer = require("nodemailer")
const crypto = require('crypto')


const {UserModel, TokenModel, LibraryModel, ThreadModel} = require('../models')

// var fs = require('fs')
var path = require('path')
var multer = require('multer')
// var sharp = require('sharp')
  
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, (__dirname,'./public/images') )
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});
  
var upload = multer({ storage: storage })


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
      req.session.user = username
      req.session.isLogin = true
      
      if(req.session.sort){
        delete req.session.sort
      }  

      if(!req.session.book){
        return res.redirect('../')
      }
      else{
        const bookid = req.session.book
        delete req.session.book
        return res.redirect(`../book/${bookid}`)
      }
      
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
      html: "<h2>RESET PASSWORD : </h2><br>" + 
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
  console.log(req.body)
  if( password == repassword){
    const passwordHash = bcrypt.hashSync(password, 10)
    
    await UserModel.findByIdAndUpdate(user_id,{user_password: passwordHash})
    return res.redirect('../login')
  }
})

router.post('/sort', async (req, res) => {
  const sort = req.body.sort

  if(req.session.user){
    await UserModel.findOneAndUpdate({user_name: req.session.user},{book_sort: sort})
    res.redirect(req.get('referer'))
  }
  else{
    req.session.sort = sort
    res.redirect(req.get('referer'))
  }
})

router.post('/payment', upload.single('img'), async (req, res) => {
  const {user_id, bank, date, hour, minute, money, img} = req.body
  console.log(req.file.filename)

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
    to: `Ahey Library <aheylibrary@gmail.com>`,
    subject: "แจ้งชำระเงิน",
    attachments: [{
      filename: `${req.file.filename}`,
      path: path.join(__dirname,`../public/images/${req.file.filename}`),
      cid: 'img'
    }],                
    html: "<h2>แจ้งชำระเงิน</h2><br>" + 
          "<b>บัญชีที่โอนเงิน : </b>" + `<p>${bank}</p><br>` +
          "<b>วันที่ชำระเงิน : </b>" + `<p>${date}</p><br>` +
          "<b>เวลา(โดยประมาณ) : </b>" + `<p>${hour}:${minute}</p><br>` +
          "<b>จำนวนเงิน : </b>" + `<p>${money}</p><br>` +
          `<img src='cid:img' alt='img'>` 
    
  }

  transporter.sendMail(mailOptions, function (err, info) {
    if(err){
      console.log(err)
    }
    else{
      res.redirect(`../profile/${user_id}`)
    }
  })
})

router.post('/save', async (req, res) => {
  const {user_id, book_id, scrollsave} = req.body
  await LibraryModel.findOneAndUpdate({user_id:user_id, book_id:book_id}, {readOn:scrollsave})
  res.redirect('../')
})

module.exports = router;
