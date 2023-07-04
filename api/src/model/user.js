const mongoose = require("mongoose");

const user =mongoose.Schema({
    username:{
        type:String,
        min:1,
        max:255
    },
    email:{
        type:String,
        min:1,
        max:255
    },
    password:{
        type:String,
        min:1,
        max:255
    },
    firstname:{
        type:String,
        min:1,
        max:255
    },
    lastname:{
        type:String,
        min:1,
        max:255
    },
    created:{
        type:Date,
        default:Date.now()
    }
})

module.exports=mongoose.model("user",user)