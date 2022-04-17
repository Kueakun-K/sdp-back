var express = require('express')
var router = express.Router()

const {UserModel, BookModel} = require('../models')

router.get('/manga', async (req, res) => {
    if(req.session.user){
      const user = await UserModel.findOne({user_name: req.session.user})
      const sort = user.book_sort
      if(sort == 'new')
        var book_manga = await BookModel.find({book_tag: 'manga'}).sort({createdAt: -1})
      else if(sort == 'view')
        var book_manga = await BookModel.find({book_tag: 'manga'}).sort({book_view: -1})
      else if(sort == 'rate')
        var book_manga = await BookModel.find({book_tag: 'manga'}).sort({book_rate: -1})
      else if(sort == 'name')
        var book_manga = await BookModel.find({book_tag: 'manga'}).sort({book_name: 1})
      return res.render('manga',{
        book: book_manga,
        user: user
      })
    }
    else{
      if(!req.session.sort){
        const book_manga = await BookModel.find({book_tag: 'manga'}).sort({createdAt: -1})
        return res.render('manga',{
          book: book_manga,
          user: req.session.user
        })
      }
      else{
        const sort = req.session.sort
        if(sort == 'new')
          var book_manga = await BookModel.find({book_tag: 'manga'}).sort({createdAt: -1})
        else if(sort == 'view')
          var book_manga = await BookModel.find({book_tag: 'manga'}).sort({book_view: -1})
        else if(sort == 'rate')
          var book_manga = await BookModel.find({book_tag: 'manga'}).sort({book_rate: -1})
        else if(sort == 'name')
          var book_manga = await BookModel.find({book_tag: 'manga'}).sort({book_name: 1})
        return res.render('manga',{
          book: book_manga,
          user: req.session.user
        })
      }
    }
})


module.exports = router