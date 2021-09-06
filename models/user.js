const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    createdEvent:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"event",
    }]
    
})

module.exports = mongoose.model("user",userSchema)
