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
        type: Date,
        default: null 
    }
})

RentSchema.index({ endAt: 1 }, { expireAfterSeconds: 0 })

const RentModel = mongoose.model("Rent",RentSchema) 

module.exports = RentModel