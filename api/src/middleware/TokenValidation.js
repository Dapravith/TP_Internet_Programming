const jwt = require('jsonwebtoken');
const User=require('../model/user')

require("dotenv").config();
module.exports =async function (req, res, next) {

    let token = req.session.token;
    // console.log(token);
    if(!token) token=req.header('Authorization');
    if(token) token=token.split(" ")[1]
    // console.log(token);
    
    if (!token) {        
        return res.status(401).json({
            msg:'Invalid Token',
        });
    }
    // console.log(token);
    
    try {
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // console.log(verified.id);
        
        if (verified) {
            const user=await User.findOne({_id:verified.id},{password:0})
            if(!user){
                return res.status(401).json({
                    msg:'Unauthorized user',
                });
            }
            req.user = user;
                next();

        }
    } catch (err) {
        return res.status(402).json({
            msg:'Invalid Token',
        });
    }
};


