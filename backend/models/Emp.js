const mongoose = require("mongoose")

//Defining Schema
const empSchema = new mongoose.Schema({
    first_name: {
        type: String,
        require: true,
        maxLength: 100
    },
    last_name: {
        type: String,
        require: true,
        maxLength: 50
    },
    email: {
        type: String,
        unique: true,
    },
    position:{
        type: String,
        require: true
    },
    salary: {
        type: Number,
        require: true
    },
    date_of_joining: {
        type: Date,
        require: true
    },
    department : {
        type : String,
        required : true
    }   
},
{
    timestamps : true
}
);


module.exports = mongoose.model("employees", empSchema)