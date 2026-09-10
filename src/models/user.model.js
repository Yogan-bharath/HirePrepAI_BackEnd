const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"Username must be Unique"],
        required:true
    },
    email:{
        type:String,
        unique:[true,"Account Aleary Exists"],
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const userModel = mongoose.model("users",UserSchema); 

module.exports = userModel;
