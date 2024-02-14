const mongoose = require("mongoose");

const jobbyUsersDataSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true
    },
    phoneNumber:{
        type : String,
        required : true
    },
    gender:{
        type : String,
        required : true
    },
    password:{
        type : String,
        required : true
    }
});

const jobbyUserData = mongoose.model('jobbyUserData', jobbyUsersDataSchema);

module.exports = jobbyUserData;