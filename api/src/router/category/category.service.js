const Category =require("../../model/category")
const SubCategory =require("../../model/subCategory")

module.exports=class categoryService{
    async list(req,res){
        const categories=await Category.find().populate({
            path: 'user',
            select: '-password' // Exclude the 'password' field
        })
        .populate('subCategory')
        .exec()

        const categoryData = categories.map(category => {
            const { _id, name, user, created } = category;
            const subCategory = category.subCategory; // Access the populated subCategory field
          
            return {
              _id,
              name,
              user,
              created,
              subCategory
            };
          });

        res.json({
            category:categoryData
        })
    }

    async create(data,req,res){
        const category=new Category({
            name:data.name,
            user:req.user._id
        })
        const saveCategory=await category.save();
        return res.json(await Category.findById(saveCategory._id).populate({
            path: 'user',
            select: '-password' // Exclude the 'password' field
        }).exec())
    }

    async delete(categoryId,req,res){
        try{
            const category=await Category.findByIdAndDelete(categoryId)
            if(!category) return res.status(404).json("Item not found")
            return res.json(category) 
        }catch(err){
            console.log(err);
            return res.status(404).json("Item not found")
        }

    }

    async update(categoryId,data,req,res){
        try{
            const category=await Category.findByIdAndUpdate(categoryId,{
                name:data.name,
                user:req.user._id
            })
            if(!category) return res.status(404).json("Item not found")
            return res.json(category) 
        }catch(err){
            console.log(err);
            return res.status(404).json("Item not found")
        }
    }

}