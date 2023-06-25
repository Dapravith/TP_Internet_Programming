const Joi = require('joi');


const categoryValidtion=(data)=>{
    const schema = Joi.object({
        name: Joi.string()
            .required()
    })
    return schema.validate(data)

}


module.exports.categoryValidtion = categoryValidtion;