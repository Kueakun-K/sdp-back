var express = require('express')
var router = express.Router()

const {UserModel, BookModel} = require('../models')

router.get('/:name', async (req, res) => {
  const section = req.params.name
  const sectionUP = section.toUpperCase()
    if(req.session.user){
      const user = await UserModel.findOne({user_name: req.session.user})
      const sort = user.book_sort
      
      if(sort == 'new')
        var book = await BookModel.find({book_tag: section}).sort({createdAt: -1})
      else if(sort == 'view')
        var book = await BookModel.find({book_tag: section}).sort({book_view: -1})
      else if(sort == 'rate')
        var book = await BookModel.find({book_tag: section}).sort({book_rate: -1})
      else if(sort == 'name')
        var book = await BookModel.find({book_tag: section}).sort({book_name: 1})
      return res.render('book_show',{
        section: sectionUP,
        book: book,
        user: user
      })
    }
    else{
      if(!req.session.sort){
        const book = await BookModel.find({book_tag: section}).sort({createdAt: -1})
        return res.render('book_show',{
          section: sectionUP,
          book: book,
          user: req.session.user
        })
      }
      else{
        const sort = req.session.sort
        if(sort == 'new')
          var book = await BookModel.find({book_tag: section}).sort({createdAt: -1})
        else if(sort == 'view')
          var book = await BookModel.find({book_tag: section}).sort({book_view: -1})
        else if(sort == 'rate')
          var book = await BookModel.find({book_tag: section}).sort({book_rate: -1})
        else if(sort == 'name')
          var book = await BookModel.find({book_tag: section}).sort({book_name: 1})
        return res.render('book_show',{
          section: sectionUP,
          book: book,
          user: req.session.user
        })
      }
    }
})


module.exports = router