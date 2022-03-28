const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    user_name: String,
    user_password : String,
    user_email: {
        type: String,
        unique: true
      },
    user_tel: String,
    user_Role: {
        type:String,
        default:"User"
    }
})

const UserModel = mongoose.model("User", UserSchema)

module.exports = UserModel