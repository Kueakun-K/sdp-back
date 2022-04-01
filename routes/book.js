var express = require('express');
var router = express.Router();

const {BookModel} = require('../models')


router.get('/', async (req, res) => {
    const book_id = req.query.id
    console.log(book_id)
    const book = await BookModel.findOneAndUpdate({_id: book_id}, { $inc: { book_view : 1 }})
    res.render('book',{book:book})
})

router.get('/addbook', (req, res) => {
    res.render('addbook')
})



module.exports = router;