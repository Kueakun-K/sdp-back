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
    book_name:String,
    isRent: {
        type:Boolean,
        default: true
    },
    book_img:{
        data: Buffer,
        contentType: String
    },
    endAt: Date,
    lastread: {
        type:Date,
        default: Date.now()
    },
    readOn: {
        type: Number,
        default: 0
    }
})

const LibraryModel = mongoose.model("Library",LibrarySchema) 

module.exports = LibraryModel