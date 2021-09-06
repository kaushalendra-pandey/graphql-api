const mongoose = require("mongoose")

const eventSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    place:{
        type:String,
        required:true
    },
    cost:{
        type:Number,
        required:true
    },
    creator: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
})

module.exports = mongoose.model("event",eventSchema)