var express = require('express');
var router = express.Router();

const bcrypt = require('bcryptjs')

// const Authorize = require('../authorize')
const {BookModel, UserModel, ThreadModel, LibraryModel} = require('../models')

router.get('/:id', async (req, res) => {
    const user_id = req.params.id
    const user = await UserModel.findById(user_id)
    var rent = await LibraryModel.find({user_id: user_id, isRent: true})
    for(var i = 0; i<rent.length;i++){
      if(rent[i].endAt < Date.now())
        await LibraryModel.findByIdAndUpdate(rent[i]._id, {isRent: false})
    }
    const book_rent = await LibraryModel.find({user_id: user_id, isRent: true})
    const read_on = await LibraryModel.find({user_id: user_id, isRent: true}).sort({lastread: -1})
    const book_notrent = await LibraryModel.find({user_id: user_id, isRent: false})
    const userthread = await ThreadModel.find({user_id: user_id})
    res.render('index_profile',{
      user: user,
      read_on: read_on,
      book_rent: book_rent,
      book_notrent: book_notrent,
      userthread: userthread,
      message: req.flash('error-edit')
    })
  })

router.post('/editusername', async (req, res) =>{
  const {user_name, newusername, password} = req.body
  const user = await UserModel.findOne({user_name: user_name})
  const isCorrect = bcrypt.compareSync(password, user.user_password)
  if(isCorrect){
    const ishave = await UserModel.findOne({user_name: newusername})
    if(!ishave){
      await UserModel.findByIdAndUpdate(user._id,{user_name:newusername})
      return res.redirect(req.get('referer'))
    }
    else{
      req.flash('error-edit', 'Username ซ้ำ')
      return res.redirect(req.get('referer'))
    }
  }
  else{
    req.flash('error-edit', 'รหัสผ่านไม่ถูกต้อง')
    return res.redirect(req.get('referer'))
  }
})

router.post('/editpassword', async (req, res) =>{
  const {user_id, newpassword, confirmnewpassword, password} = req.body
  const user = await UserModel.findById(user_id)
  const isCorrect = bcrypt.compareSync(password, user.user_password)
  if(isCorrect){
    if(newpassword == confirmnewpassword){
      const passwordHash = bcrypt.hashSync(newpassword, 10)
      await UserModel.findByIdAndUpdate(user._id,{user_password:passwordHash})
      return res.redirect(req.get('referer'))
    }
  }
  else{
    req.flash('error-edit', 'รหัสผ่านไม่ถูกต้อง')
    return res.redirect(req.get('referer'))
  }
})

router.post('/editemail', async (req, res) =>{
  const {user_email, newemail, password} = req.body
  const user = await UserModel.findOne({user_email: user_email})
  const isCorrect = bcrypt.compareSync(password, user.user_password)
  if(isCorrect){
    const ishave = await UserModel.findOne({user_email: newemail})
    if(!ishave){
      await UserModel.findByIdAndUpdate(user._id,{user_email: newemail})
      return res.redirect(req.get('referer'))
    }
    else{
      req.flash('error-edit', 'Email ซ้ำ')
      return res.redirect(req.get('referer'))
    }
  }
  else{
    req.flash('error-edit', 'รหัสผ่านไม่ถูกต้อง')
    return res.redirect(req.get('referer'))
  }
})

module.exports = router;