const mongoose = require("mongoose")

const ThreadSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    book_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    user_name: String,
    section: String,
    content: String,
    thread_rate:{
        type:mongoose.Types.Decimal128,
        default:0
    }, 
    thread_view:{
        type: Number,
        default:0
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const ThreadModel = mongoose.model("Thread",ThreadSchema) 

module.exports = ThreadModel