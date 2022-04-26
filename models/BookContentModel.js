const mongoose = require("mongoose")

const BookContentSchema = mongoose.Schema({
    book_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    index: Number,
    book_img:{
        data: Buffer,
        contentType: String
    }
})

const BookContentModel = mongoose.model("BookContent",BookContentSchema) 

module.exports = BookContentModel