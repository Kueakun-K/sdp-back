var express = require('express')
var router = express.Router()

const {ThreadModel, ThreadCommentModel, UserModel, BookModel} = require('../models')

router.get('/:id', async (req, res) => {
    const thread_id = req.params.id
    const thread = await ThreadModel.findOneAndUpdate({_id: thread_id}, { $inc: { thread_view : 1 }})
    const comment = await ThreadCommentModel.find({thread_id: thread_id})
    if(req.session.user){
        var user = await UserModel.findOne({user_name: req.session.user})
      }
    return res.render('thread_book',{
        user: user,
        thread: thread,
        thread_comment: comment
    })
})

router.post('/postthread', async (req, res) => {

    const user = await UserModel.findOne({user_name: req.session.user})
    const book = await BookModel.findById(req.body.book_id)

    var obj = {
        user_id: user._id,
        book_id: book._id,
        book_img: {
            data: book.book_img.data,
            contentType: 'image/png'
        },
        user_name: user.user_name,
        section: req.body.section,
        content: req.body.content
    }

    ThreadModel.create(obj, (err, item) =>{
        if (err) {
            console.log(err);
        }
        else {
            return res.redirect('../');
        }
    })
})

module.exports = router