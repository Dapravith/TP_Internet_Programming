const mongoose = require("mongoose");


const price=mongoose.Schema({
    name: String,
    price: Number
})

const category =mongoose.Schema({
    name:{
        type:String,
        min:1,
        max:255
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    subcategory:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sub_category'
    },
    image:String,
    description: {
        type:String
    },
    prices:[price],
    created:{
        type:Date,
        default:Date.now()
    }
})

module.exports=mongoose.model("product",category)