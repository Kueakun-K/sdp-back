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
      userthread: userthread
    })
  })

router.post('/:id/edit', async (req, res) => {
    const {user_id, username, password, repassword, confirmpassword} = req.body
    console.log(req.body)
    const user = await UserModel.findById(user_id)
    const isCorrect = bcrypt.compareSync(confirmpassword, user.user_password)
    if(isCorrect){
    if(password.length > 2){
      if( password == repassword){
        var passwordHash = bcrypt.hashSync(password, 10)
        await UserModel.findByIdAndUpdate(user._id,{user_password: passwordHash})
      }
    }
      await UserModel.findByIdAndUpdate(user._id,{user_name: username})
      req.session.user = username
      res.redirect('./')
    }
    else{
      // var rent = await LibraryModel.find({user_id: user_id, isRent: true})
      // for(var i = 0; i<rent.length;i++){
      //   if(rent[i].endAt < Date.now())
      //     await LibraryModel.findByIdAndUpdate(rent[i]._id, {isRent: false})
      // }
      // const book_rent = await LibraryModel.find({user_id: user_id, isRent: true})
      // const read_on = await LibraryModel.find({user_id: user_id, isRent: true}).sort({lastread: -1})
      // const book_notrent = await LibraryModel.find({user_id: user_id, isRent: false})
      // const userthread = await ThreadModel.find({user_id: user_id})
      // res.render('index_profile',{
      //   user: user,
      //   read_on: read_on,
      //   book_rent: book_rent,
      //   book_notrent: book_notrent,
      //   userthread: userthread,
      //   message: "รหัสผ่านไม่ถูกต้อง"
      // })
      res.redirect(`../${user_id}/edit`)
    }
})

router.get('/:id/edit', async (req, res) => {
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
        message: "รหัสผ่านไม่ถูกต้อง"
      })
})

module.exports = router;