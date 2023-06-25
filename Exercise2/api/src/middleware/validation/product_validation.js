const Joi = require('joi');


const productValidtion=(data)=>{
    const schema = Joi.object({
        name: Joi.string()
        .required(),
        categoryId:Joi.string(),
        subCategoryId:Joi.string(),
        description:Joi.string(),
        price:Joi.array().items(
            Joi.object({
                name:Joi.string().required(),
                price:Joi.number().required()
            })
            )
        })
        return schema.validate(data)
        
    }
    
    
    const priceValidtion=(data)=>{
        const schema = Joi.object({
            name:Joi.string().required(),
            price:Joi.number().required()
        })
        return schema.validate(data)
        
    }
    
    
    module.exports.productValidtion = productValidtion;
    module.exports.priceValidtion = priceValidtion;