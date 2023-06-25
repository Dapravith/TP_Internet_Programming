const express = require('express')
const router = express.Router()
const categoryService=require("./category.service")
const {check_category} =require("../../middleware/check_category")
const TokenValidation =require("../../middleware/TokenValidation")
require("dotenv").config();


const CATEGORY_SERVICE=new categoryService;

router.get("/" ,async (req,res)=>{
 
    return await CATEGORY_SERVICE.list(req,res)
})

router.delete("/:categoryId",TokenValidation,async(req,res)=>{
    
    return await CATEGORY_SERVICE.delete(req.params.categoryId,req,res)

})

router.post("/",TokenValidation,check_category,async(req,res)=>{
    
    return await CATEGORY_SERVICE.create(req.body,req,res)

})

router.put("/:categoryId",TokenValidation,check_category,async(req,res)=>{
    
    return await CATEGORY_SERVICE.update(req.params.categoryId,req.body,req,res)

})

module.exports = router