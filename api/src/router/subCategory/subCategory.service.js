const SubCategory =require("../../model/subCategory")

module.exports=class subCategoryService{
    async list(req,res){
        const subCategory=await SubCategory.find().populate({
            path: 'user',
            select: '-password' // Exclude the 'password' field
        }).populate({
            path: 'category'
        }).exec()
        
        res.json({
            subCategory:subCategory
        })
    }
    
    async create(data,categoryId,req,res){
        console.log(req.user);
        const subCategory=new SubCategory({
            name:data.name,
            user:req.user._id,
            category:categoryId
        })
        const saveSubCategory=await subCategory.save();
        return res.json(await SubCategory.findById(saveSubCategory._id).populate({
            path: 'user',
            select: '-password' // Exclude the 'password' field
        }).populate({
            path: 'category'
        }).exec())
    }
    
    async delete(subCategoryId,req,res){
        try{
            const subCategory=await SubCategory.findByIdAndDelete(subCategoryId)
            if(!subCategory)            return res.status(404).json("Item not found")
            return res.json(subCategory)
            
        }catch(err){
            console.log(err);
            return res.status(404).json("Item not found")
        }
    }
    
    
    async update(subCategoryId,data,req,res){
        
        try{
            let categoryId=data.categoryId
            if(categoryId){
                const subCategory =await SubCategory.findByIdAndUpdate(subCategoryId,{
                    name:data.name,
                    category:categoryId,
                    
                })
                if(!subCategory) return res.status(404).json("Item not found")
                return res.json(
                    subCategory
                    )
                }
                const subCategory =await SubCategory.findByIdAndUpdate(subCategoryId,{
                    name:data.name,
                    user:req.user._id
                })
                if(!subCategory) return res.status(404).json("Item not found")
                return res.json(
                    subCategory
                    )
                    
                    
                }catch(err){
                    console.log(err);
                    return res.status(404).json("Item not found")
                }
            }
            
            
            async listByCategoryId(CategoryId,req,res){
                try{
                    console.log(CategoryId);
                    const subCategory=await SubCategory.find({category:CategoryId})
                    if(!subCategory)return res.status(404).json("Item not found")
                    return res.json(subCategory)
                }catch(err){
                    console.log(err);
                    return res.status(404).json("Item not found")
                }
            }
            
        }