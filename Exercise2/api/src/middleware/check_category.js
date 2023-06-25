const {categoryValidtion}=require('./validation/category_validation')
const {subCategoryUpdateValidtion}=require('./validation/subcategory_update_validation')
function check_category(req,res,next){
    const data=req.body;
    const {error}=categoryValidtion(data);
    if(error){ return res.status(400).send(error.details[0].message);}
    next()
}
function check_subCategory_update(req,res,next){
    const data=req.body;
    const {error}=subCategoryUpdateValidtion(data);
    if(error){ return res.status(400).send(error.details[0].message);}
    next()
}

module.exports.check_subCategory_update=check_subCategory_update
module.exports.check_category=check_category