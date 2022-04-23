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
    user_name:String,
    rate:{ 
        type: Number,
        min: 0, 
        max: 5 
    },
    comment: {
        type: String,
        default: ""
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const BookCommentModel = mongoose.model("BookComment",BookCommentSchema) 

module.exports = BookCommentModel