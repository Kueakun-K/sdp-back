const mongoose = require("mongoose")

const LibrarySchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    book_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    isRent: {
        type:Boolean,
        default: true
    },
    book_img:{
        data: Buffer,
        contentType: String
    }
})

const LibraryModel = mongoose.model("Library",LibrarySchema) 

module.exports = LibraryModel