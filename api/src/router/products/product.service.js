const Product=require("../../model/product")
const {deleteFile}=require("../../util/File")
module.exports=class productService{
    async list(req,res){
        return res.json({
            product:await Product.find({},'-prices._id')
            .populate({
                path:"user",
                select:"-password"
            })
            .populate({
                path:"category",
                
            })
            .populate({
                path:"subcategory",
            })
            .exec()
        })
    }
    
    async detail(productId,req,res){
        try{
            const product=await Product.findById(productId)
            .populate({
                path:"user",
                select:"-password"
            })
            .populate({
                path:"category",
                
            })
            .populate({
                path:"subcategory",
            })
            .exec()
            if(!product) return res.status(404).json("Item not found")
            return res.json(product)
        }catch(err){
            console.log(err);
            return res.status(404).json("Item not found")
        }
    }


    async create(data,imagePath,req,res){
        const newProduct=await new Product({
            name:data.name,
            user:req.user._id,
            category:data.categoryId,
            subcategory:data.subCategoryId,
            image:imagePath,
            description:data.description,
            prices:data.price
        })
        const saveProduct=await newProduct.save()
        return res.json(
            await Product.findById(saveProduct._id)
            .populate({
                path:"user",
                select:"-password"
            })
            .populate({
                path:"category",
                
            })
            .populate({
                path:"subcategory",
            })
            .exec()
            )
    }
        
        
    async update(data,productId,imagePath,req,res){
  
        try{
            const oldProduct=await Product.findById(productId)
            if(!oldProduct) return res.status(404).json("Item not found")
            if(!imagePath){
                return res.json(await Product.findByIdAndUpdate(productId,data))
            }
            if(oldProduct.image){
                deleteFile(oldProduct.image)
            }
            let updated=await Product.findByIdAndUpdate(productId,data)

            if(data.prices){
                updated.prices=data.prices
            }

            updated.image=imagePath
            return res.json(await updated.save())
        }catch(err){
            console.log(err);
            return res.status(404).json("Item not found")
        }
    }
    
    async delete(productId,req,res){
        try{
            const product=await Product.findByIdAndDelete(productId)
            if(!product) return res.status(404).json("Item not found")
            deleteFile(product.image)
            return res.json(product);
        }catch(err){
            console.log(err);
            return res.status(404).json("Item not found")
        }
    }
    

    async getBySubCategoryId(subCategoryId,req,res){
        try{
            const product=await Product.find({subcategory:subCategoryId})
            if(!product) return res.status(404).json("Item not found")
            return res.json(product);
        }catch(err){
            console.log(err);
            return res.status(404).json("Item not found")
        }
    }
    async getByCategoryId(CategoryId,req,res){
        try{
            const product=await Product.find({category:CategoryId})
            if(!product) return res.status(404).json("Item not found")
            return res.json(product);
        }catch(err){
            console.log(err);
            return res.status(404).json("Item not found")
        }
    }

    
    async addPrice(productId,price,req,res){
        try{
            const oldProduct=await Product.findById(productId)
            if(!oldProduct) return res.status(404).json("Item not found")
            oldProduct.prices.push(price)
            await oldProduct.save()
            return res.json(
                await Product.findById(oldProduct._id)
                .populate({
                    path:"user",
                    select:"-password"
                })
                .populate({
                    path:"category",
                    
                })
                .populate({
                    path:"subcategory",
                })
                .exec()
                )
            }catch(err){
                // console.log(err);
                return res.status(404).json("Item not found")
            }
    }
        
    async deletePrice(productId,priceid,req,res){
        try{
            const oldProduct=await Product.findById(productId)
            if(!oldProduct) return res.status(404).json("Item not found")
            oldProduct.prices=oldProduct.prices.filter(item=>{
                if(item._id!=priceid){
                    return item
                }
            })
            await oldProduct.save()
            return res.json(
                await Product.findById(oldProduct._id)
                .populate({
                    path:"user",
                    select:"-password"
                })
                .populate({
                    path:"category",
                    
                })
                .populate({
                    path:"subcategory",
                })
                .exec()
                )
            }catch(err){
                console.log(err);
                return res.status(404).json("Item not found")
            }
    }

    async updatePrice(productId,priceid,price,req,res){
        try{
            let isHas=false;
            const oldProduct=await Product.findById(productId)
            if(!oldProduct) return res.status(404).json("Item not found")
            oldProduct.prices=oldProduct.prices.filter(item=>{
                if(item._id==priceid){
                    item.name=price.name
                    item.price=price.price
                    isHas=true
                    return item
                }
                return item
            })
            // return res.json(oldProduct)
            await oldProduct.save()
            return res.json(
                {
                    msg : isHas? "Update successfull":"price not exist",
                    Product: await Product.findById(oldProduct._id)
                    .populate({
                        path:"user",
                        select:"-password"
                    })
                    .populate({
                        path:"category",
                        
                    })
                    .populate({
                        path:"subcategory",
                    })
                    .exec()
                }
                )
        }catch(err){
            console.log(err);
            return res.status(404).json("Item not found")
        }
    }
            
    async listPrice(productId,req,res){
        try{
            const oldProduct=await Product.findById(productId)
            if(!oldProduct) return res.status(404).json("Item not found")
            return res.json(oldProduct.prices)
        }catch(err){
            console.log(err);
            return res.status(404).json("Item not found")
        }
    }
                    
}