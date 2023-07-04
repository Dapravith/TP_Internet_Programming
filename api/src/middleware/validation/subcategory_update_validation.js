const Joi = require('joi');


const subCategoryUpdateValidtion=(data)=>{
    const schema = Joi.object({
        name: Joi.string()
            .required(),
        categoryId:Joi.string()
    })
    return schema.validate(data)

}


module.exports.subCategoryUpdateValidtion = subCategoryUpdateValidtion;