var express = require('express')
var router = express.Router()


const {BookModel, UserModel, BookCommentModel, LibraryModel, ThreadModel, BookContentModel} = require('../models')

var fs = require('fs')
var path = require('path')
var multer = require('multer')
var sharp = require('sharp')
  
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, (__dirname,'./public/images') )
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});
  
var upload = multer({ storage: storage })


router.get('/:id', async (req, res) => {
    const book_id = req.params.id
    var checkthread = false
    if(req.session.user){
        var user = await UserModel.findOne({user_name: req.session.user})
        var usercomment = await BookCommentModel.findOne({user_name: req.session.user, book_id: book_id})
        var rent = await LibraryModel.findOne({user_id: user._id, book_id: book_id})
        if(rent){
            if(rent.endAt < Date.now() && rent.isRent == true)
                await LibraryModel.findByIdAndUpdate(rent._id, {isRent: false})
        }
        var rent_book = await LibraryModel.findOne({user_id: user._id, book_id: book_id})
        var thread = await ThreadModel.findOne({user_id: user._id, book_id: book_id})
        if(thread == null){
            checkthread = true
        }

    }
    const book = await BookModel.findOneAndUpdate({_id: book_id}, { $inc: { book_view : 1 }})
    const comment = await BookCommentModel.find({book_id: book_id})
    const rate = Math.round(book.book_rate)
    var check 
    
    if(rent_book == null){
        check = false
    }
    else{
        check = rent_book.isRent
    }
    if(usercomment == null){
        usercomment = false
    }
    return res.render('book',{
        user: user,
        usercomment: usercomment,
        book:book,
        rent: check,
        thread: checkthread,
        book_comment: comment,
        rate: rate,
        message: req.flash('error-rent')
    })
})

router.post('/postbook', upload.array('multiimg[]'), async (req, res) => {
    const length = Object.keys(req.files).length

    await sharp(path.resolve(__dirname,'../public/images/' + req.files[0].filename)).resize({
        width: 450,
        height: 700,
    }).toFile(path.resolve(__dirname,'../public/resize/' + req.files[0].filename))
    
    const postbook = new BookModel({
      book_name: req.body.book_name,
      book_tag: req.body.book_tag,
      book_description: req.body.book_description,
      book_price: req.body.book_price,
      book_img: {
            data: fs.readFileSync(path.join(__dirname,'../public/resize/' + req.files[0].filename)),
            contentType: 'image/png'
        }
    })
    await postbook.save()
    const book = await BookModel.findOne({book_name: req.body.book_name})
    for(var i = 0; i<length;i++){
        var content = new BookContentModel({
            book_id: book._id,
            index: i,
            book_img:{
                data: fs.readFileSync(path.join(__dirname,'../public/images/' + req.files[i].filename)),
                contentType: 'image/png'
            }
        })
        await content.save()
    }
    return res.redirect('../')
})
  
router.put('/update', async (req, res) => {
    const book_id = req.body.id
    const {book_name, book_tag, book_description, book_price} = req.body
    const data = {book_name, book_tag, book_description, book_price}
    await BookModel.findOneAndUpdate({_id: book_id},data)
    return res.redirect('../')
})
  
router.delete('/delete', async (req, res) => {
    const book_id = req.body.id
    console.log(book_id)
    await BookModel.findOneAndDelete({_id:book_id})
    await BookCommentModel.deleteMany({book_id: book_id})
    await BookContentModel.deleteMany({book_id: book_id})
    await LibraryModel.deleteMany({book_id: book_id})
    await ThreadModel.deleteMany({book_id: book_id})
    return res.redirect('../')
})

router.post('/rent', async (req, res) => {
    const {book_id, day} = req.body

    if(!req.session.isLogin){
        req.session.book = book_id
        return res.redirect('../login')
    }

    const user = await UserModel.findOne({user_name: req.session.user})
    const book = await BookModel.findById(book_id)
    const cost = day * book.book_price
    if(cost > user.user_money){
        req.flash('error-rent', 'ยอดเงินไม่เพียงพอ')
        return res.redirect(req.get('referer'))
    }
    else{
        const oneDay = 24 * 60 * 60 * 1000
        
        const inLibrary = await LibraryModel.findOne({user_id: user._id, book_id: book._id})
        if(!inLibrary){
            const createlibrary = new LibraryModel({
                user_id: user._id,
                book_id: book._id,
                book_name: book.book_name,
                book_img: {
                    data: book.book_img.data,
                    contentType: 'image/png'
                },
                endAt: Date.now() + (day * oneDay)
            })
            await createlibrary.save()
            await UserModel.findByIdAndUpdate(user._id, {user_money: user.user_money - cost, user_point: user.user_point + cost})
            return res.redirect(req.get('referer'))
        }
        else{
            await LibraryModel.findOneAndUpdate({user_id: user._id, book_id: book._id}, {isRent: true, endAt: Date.now() + (day * oneDay), lastread: Date.now()})
            await UserModel.findByIdAndUpdate(user._id, {user_money: user.user_money - cost, user_point: user.user_point + cost})
            return res.redirect(req.get('referer'))
        }
    }
})

router.post('/comment', async (req, res) => {
    const {book_id, rate, comment} = req.body

    if(!req.session.isLogin){
        req.session.book = book_id
        return res.redirect('../login')
    }

    const user = await UserModel.findOne({user_name: req.session.user})

    const comment_book = new BookCommentModel({
        user_id: user._id,
        book_id,
        user_name: user.user_name,
        rate,
        comment
    })
    await comment_book.save()

    const rate_book = await BookCommentModel.find({book_id:book_id})
    var rate_sum = 0
    for(i = 0;i < rate_book.length; i++){
        rate_sum += rate_book[i].rate
    }
    const rate_result = rate_sum / rate_book.length
    const rate_round = Math.round(rate_result * 10) /10
    await BookModel.findOneAndUpdate({_id: book_id},{book_rate: rate_round})

    res.redirect(req.get('referer'))
})

router.delete('/deletecomment', async (req, res) => {
    const id  = req.body.id
    const book_id = req.body.book_id
    await BookCommentModel.findByIdAndDelete(id)

    const rate_book = await BookCommentModel.find({book_id:book_id})
    console.log(rate_book)
    if(rate_book.length > 0){
        var rate_sum = 0
        for(i = 0;i < rate_book.length; i++){
            rate_sum += rate_book[i].rate
        }
        const rate_result = rate_sum / rate_book.length
        var rate_round = Math.round(rate_result * 10) /10
    }
    else{
        var rate_round = 0
    }
    console.log(rate_round)
    await BookModel.findOneAndUpdate({_id: book_id},{book_rate: rate_round})

    res.redirect(req.get('referer'))
})



module.exports = router;