const mongoose = require('mongoose');

const userSchema=new mongoose.Schema({
    username:{
        type: String,
        required:true,
        max:16,
        unique:true,
        min:4

    },
    email:{
        type:String,
        unique:true,
        required:true,
        max:20
    },
    password:{
        type:String,
        required:true,
        max:20,
        min:6
    },
    isavatharset:{
        type: String,
        default:false
    },
    avathar:{
        type:String,
        default:''
    }
})
module.exports =mongoose.model('users',userSchema);