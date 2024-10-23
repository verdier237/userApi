const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required : true
    },
    pwd:{
        type:String,
        required : true
    },
    firstname:{
        type:String,
        required : true
    },
    lastname:{
        type:String,
        required: true
    },
    age:{
        type: Number,
        required:true
    },
    sex:{
        type:String,
        required:true
    },
    cell:{
        type : String,
        required : true
    }
})

module.exports = mongoose.model('User', UserSchema,'user');