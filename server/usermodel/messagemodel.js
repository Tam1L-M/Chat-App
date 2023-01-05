const Mongoose = require('mongoose');

const Messageschema=new Mongoose.Schema({
    message:{
        text:{
        type:String,
        required:true
        }
    },
    user:Array,
    sender:{
        type:Mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'users'
    }  
},{
    timestamps:true
})
module.exports =Mongoose.model('Messages',Messageschema);