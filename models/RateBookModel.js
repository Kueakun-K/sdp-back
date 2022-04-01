const mongoose = require('mongoose')

const RateBookSchema = mongoose.Schema({
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
    }
})

const RateBookModel = mongoose.model("RateBook",RateBookSchema) 

module.exports = RateBookModel