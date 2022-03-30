const mongoose = require("mongoose")

const TokenSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
        // ref: "user",
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 600
    }
})

const TokenModel = mongoose.model("Token",TokenSchema) 

module.exports = TokenModel