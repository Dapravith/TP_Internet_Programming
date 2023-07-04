const express = require('express')
const router = express.Router()
const subCategoryService=require("./subCategory.service")
const {check_category,check_subCategory_update} =require("../../middleware/check_category")
const TokenValidation =require("../../middleware/TokenValidation")
require("dotenv").config();


const SUB_CATEGORY_SERVICE=new subCategoryService;

router.get("/" ,async (req,res)=>{
 
    return await SUB_CATEGORY_SERVICE.list(req,res)
})

router.post("/:categoryId",TokenValidation,check_category,async(req,res)=>{
    
    return await SUB_CATEGORY_SERVICE.create(req.body,req.params.categoryId,req,res)

})

router.delete("/:subCategoryId",TokenValidation,async(req,res)=>{
    // console.log(req.params.subCategoryId);
    return await SUB_CATEGORY_SERVICE.delete(req.params.subCategoryId,req,res)

})
router.put("/:subCategoryId",TokenValidation,check_subCategory_update,async(req,res)=>{
    
    return await SUB_CATEGORY_SERVICE.update(req.params.subCategoryId,req.body,req,res)

})

router.get("/:CategoryId",async(req,res)=>{
    return await SUB_CATEGORY_SERVICE.listByCategoryId(req.params.CategoryId,req,res)
})

module.exports = router