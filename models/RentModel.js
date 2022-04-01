const mongoose = require("mongoose")

const RentSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    book_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    createdAt:{
        type:Date
    },
    endAt:{
        type: Date
    }
})

const RentModel = mongoose.model("Rent",RentSchema) 

module.exports = RentModel