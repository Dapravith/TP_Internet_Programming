const {productValidtion,priceValidtion} = require("./validation/product_validation")
function check_product(req,res,next){
    const { name, categoryId, subCategoryId, description, price } = req.body;
    // console.log(req.body);
    const {error}=productValidtion({
        name,
        categoryId,
        subCategoryId,
        description,
        price:JSON.parse(price)
    });

    if(error){ return res.status(400).send(error.details[0].message);}
    next()
}

function check_price(req,res,next){
    const {error} =priceValidtion(req.body)
    if(error){ return res.status(400).send(error.details[0].message);}
    next()
}

module.exports.check_product=check_product
module.exports.check_price=check_price