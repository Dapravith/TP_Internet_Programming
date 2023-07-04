const mongoose = require("mongoose");

const category =mongoose.Schema({
    name:{
        type:String,
        min:1,
        max:255
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    created:{
        type:Date,
        default:Date.now()
    }
})

module.exports=mongoose.model("sub_category",category)