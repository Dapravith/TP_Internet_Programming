const mongoose = require("mongoose");

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
    created:{
        type:Date,
        default:Date.now()
    }
})

category.virtual("subCategory", {
    ref: "sub_category",        // Referenced model name
    localField: "_id",          // Field in the current model
    foreignField: "category",   // Field in the referenced model
  })

module.exports=mongoose.model("category",category)