const mongoose = require("mongoose")

const BookCommentSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    book_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    rate:{ 
        type: Number,
        min: 1, 
        max: 5 
    },
    comment: String,
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const BookCommentModel = mongoose.model("BookComment",BookCommentSchema) 

module.exports = BookCommentModel