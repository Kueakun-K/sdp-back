const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    user_name: String,
    user_password : String,
    user_email: {
        type: String,
        unique: true
      },
    user_point: {
        type: Number,
        default: 0
    },
    user_money: {
        type: Number,
        default: 0
    },
    book_sort:{
        type: String,
        default: "new"
    },
    user_Role: {
        type:String,
        default: "User"
    }
})

const UserModel = mongoose.model("User", UserSchema)

module.exports = UserModel