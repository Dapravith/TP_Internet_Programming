const User=require('../model/user')
const {RegisterValidation,LoginValidation}=require('./validation/user_validation')
function check_register(req,res,next){
    const data=req.body;
    const {error}=RegisterValidation(data);
    if(error){ return res.status(400).send(error.details[0].message);}
    next()
}
function check_login(req,res,next){
    const data=req.body;
    const {error}=LoginValidation(data);
    if(error){ return res.status(400).send(error.details[0].message);}
    next()
}

async function  check_credentail(req,res,next){
    const data=req.body;
    let user=await User.findOne({username:data.username})
    if(user) return res.status(400).send({"msg":"Credentail already taken"})
    user=await User.findOne({email:data.email})
    if(user) return res.status(400).send({"msg":"Credentail already taken"})
    next()
}

module.exports.check_register=check_register
module.exports.check_login=check_login
module.exports.check_credentail=check_credentail