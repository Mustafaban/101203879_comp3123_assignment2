const mongoose = require("mongoose")

//Defining Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        maxLength: 100
    },
    password: {
        type: String,
        maxLength: 50
    },
    email: {
        type: String,
        unique: true,
    }
})

//Creating Model from Schema
module.exports = mongoose.model("user", userSchema)