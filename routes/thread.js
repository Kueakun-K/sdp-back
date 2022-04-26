var express = require('express')
var router = express.Router()

const {ThreadModel, ThreadCommentModel, UserModel, BookModel} = require('../models')

router.get('/', async (req, res) =>{
    const thread = await ThreadModel.find()
    if(req.session.user){
      var user = await UserModel.findOne({user_name: req.session.user})
    }
    res.render('thread',{
      user: user,
      thread: thread
    })
})


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
    console.log(user)
    
    const  createthread = new ThreadModel({
        user_id: user._id,
        book_id: book._id,
        book_img: {
            data: book.book_img.data,
            contentType: 'image/png'
        },
        user_name: user.user_name,
        section: req.body.section,
        content: req.body.content
    })
    await createthread.save()
    const thread = await ThreadModel.findOne({user_id: user._id, book_id: book._id})
    res.redirect(`../thread/${thread._id}`)
})

router.post('/comment', async (req ,res) => {
    const {user_id, thread_id, comment} = req.body
    const user = await UserModel.findById(user_id)
    const comment_thread = new ThreadCommentModel({
        user_id: user_id,
        thread_id: thread_id,
        user_name: user.user_name,
        comment: comment
    })
    await comment_thread.save()
    res.redirect(req.get('referer'))
})

router.get('/search/id/:id', async (req, res) => {
    const book_id = req.params.id
    const thread = await ThreadModel.find({book_id: book_id})
    if(req.session.user){
        var user = await UserModel.findOne({user_name: req.session.user})
    }
    res.render('thread',{
        user: user,
        thread: thread
    })
})

router.delete('/deletethread', async(req, res) =>{
    const thread_id = req.body.thread_id
    await ThreadModel.findByIdAndDelete(thread_id)
    res.redirect('../thread')
})

module.exports = router