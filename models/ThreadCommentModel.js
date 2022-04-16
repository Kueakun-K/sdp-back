const mongoose = require("mongoose")

const ThreadCommentSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    thread_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    user_name:String,
    rate:{ 
        type: Number,
        min: 1, 
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

const ThreadCommentModel = mongoose.model("ThreadComment",ThreadCommentSchema) 

module.exports = ThreadCommentModel