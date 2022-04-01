const mongoose = require("mongoose")

const BookSchema = mongoose.Schema({
    book_name: String,
    book_tag: String,
    book_description: String,
    book_price: Number,
    book_img:{
        data: Buffer,
        contentType: String
    },
    book_rate:{
        type: Number,
        default:0
    } , 
    book_view:{
        type: Number,
        default:0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const BookModel = mongoose.model("Book",BookSchema) 

module.exports = BookModel