const mongoose = require("mongoose")

const BookCommentSchema = mongoose.Schema({
    book_id: String,
    user_name: String,
    comment: String,
    date:{
        type:Date,
        default:Date.now()
    }
})

const BookCommentModel = mongoose.model("BookComment",BookCommentSchema) 

module.exports = BookCommentModel