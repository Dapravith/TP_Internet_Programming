const express = require('express')
const router = express.Router()
const multer = require('multer');
const path = require('path');
const {saveFile}=require("../../util/File")
const upload = multer();
const productService=require("./product.service.js")
const {check_product,check_price}=require("../../middleware/product_validation_Check")
const TokenValidation =require("../../middleware/TokenValidation")
const PRODUCT_SERVICE=new productService;

router.get("/",async(req,res)=>{
  return await PRODUCT_SERVICE.list(req,res)
})

router.get("/:id",async(req,res)=>{
  return await PRODUCT_SERVICE.detail(req.params.id,req,res)
})

router.post("/",TokenValidation,upload.single('file'),check_product, async(req,res)=>{
  let imagePath="";
  if(req.body.price){
    req.body.price=JSON.parse(req.body.price)
  }
  if(req.file){
    const fileBuffer = req.file.buffer;
    const fileExtension = path.extname(req.file.originalname);
    // console.log(fileExtension);
    imagePath=saveFile(fileBuffer,fileExtension,"static/product")
  }
  return await PRODUCT_SERVICE.create(req.body,imagePath,req,res)
})


router.put("/:id",TokenValidation,upload.single('file'),async(req,res)=>{
  let imagePath=null;
  if(req.body.prices){
    req.body.prices=JSON.parse(req.body.prices)
  }

  if(req.file){
    const fileBuffer = req.file.buffer;
    const fileExtension = path.extname(req.file.originalname);
    // console.log(fileExtension);
    imagePath=saveFile(fileBuffer,fileExtension,"static/product")
  }
  
  return await PRODUCT_SERVICE.update(req.body,req.params.id,imagePath,req,res)
})

router.delete("/:id",TokenValidation,async (req,res)=>{
  return await PRODUCT_SERVICE.delete(req.params.id,req,res)
})


router.get("/getbysubcategory/:subcategoryid",async (req,res)=>{
  return await PRODUCT_SERVICE.getBySubCategoryId(req.params.subcategoryid,req,res)
})
router.get("/getbycategory/:categoryid",async (req,res)=>{
  return await PRODUCT_SERVICE.getByCategoryId(req.params.categoryid,req,res)
})


router.get("/price/list/:id",TokenValidation,async (req,res)=>{
  return await PRODUCT_SERVICE.listPrice(req.params.id,req,res)
})
router.post("/price/add/:id",TokenValidation,check_price,async (req,res)=>{
  return await PRODUCT_SERVICE.addPrice(req.params.id,req.body,req,res)
})
router.delete("/price/delete/:productId/:priceId",TokenValidation,async (req,res)=>{
  return await PRODUCT_SERVICE.deletePrice(req.params.productId,req.params.priceId,req,res)
})
router.put("/price/update/:productId/:priceId",TokenValidation,check_price,async (req,res)=>{
  return await PRODUCT_SERVICE.updatePrice(req.params.productId,req.params.priceId,req.body,req,res)
})


module.exports = router