var express = require('express');
var router = express.Router();

const {BookModel} = require('../models')

var multer = require('multer');
  
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, (__dirname,'./public/images') )
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
  
var upload = multer({ storage: storage })


router.get('/:id', async (req, res) => {
    const book_id = req.params.id
    console.log(book_id)
    const book = await BookModel.findOneAndUpdate({_id: book_id}, { $inc: { book_view : 1 }})
    res.render('book',{book:book})
})

router.get('/addbook', (req, res) => {
    res.render('addbook')
})

router.post('/addbook', upload.single('img'), async (req, res) => {
    var obj = {
      book_name: req.body.book_name,
      book_tag: req.body.book_tag,
      book_description: req.body.book_description,
      book_price: req.body.book_price,
      book_img: {
            data: fs.readFileSync(path.join(__dirname,'../public/images/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    BookModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('../');
        }
    })
})
  
router.put('/update', async (req, res) => {
    const book_id = req.body.id
    const {book_name, book_tag, book_description, book_price} = req.body
    const data = {book_name, book_tag, book_description, book_price}
    await BookModel.findOneAndUpdate({_id: book_id},data)
    res.redirect('../')
})
  
router.delete('/delete', async (req, res) => {
    const book_id = req.body.id
    console.log(book_id)
    await BookModel.findOneAndDelete({_id:book_id})
    res.redirect('../')
})
  
router.get('/search', async (req, res) => {
    const bookname = req.query.bookname
    const result = await BookModel.find({book_name: {$regex: bookname}})
    res.render('search',{book: result})
})



module.exports = router;