const express = require('express')
const router = express.Router()

//router
const userRouter=require('./router/user/user.controller')
const categoryRouter=require('./router/category/category.controller')
const subCategoryRouter=require('./router/subCategory/subCategory.controller')
const productRouter=require('./router/products/product.controller')


//Actaull code

router.use('/user',userRouter)
router.use('/category',categoryRouter)
router.use('/sub-category',subCategoryRouter)
router.use('/product',productRouter)


module.exports = router