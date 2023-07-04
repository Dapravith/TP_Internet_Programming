const express = require('express')
const router = express.Router()
const User=require('../../model/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService =  require("./user.service")
const {check_register,check_login,check_credentail}=require('../../middleware/check_user_rout_req')
const TokenValidation = require('../../middleware/TokenValidation');
require("dotenv").config();




const USER_SERVICE=new  userService;




router.post('/login',check_login,async(req,res)=>{

    return await USER_SERVICE.login(req.body,req,res)
})





router.post('/register', check_register,check_credentail, async (req,res)=>{

    return await USER_SERVICE.register(req.body,req,res)
    
})

router.get("/me",TokenValidation,(req,res)=>{
    const user=req.user;
    delete user.password;
    return res.json(req.user)
})


router.post('/logout', async(req, res) => {
    // Clear the session cookie
   return await USER_SERVICE.loggout(req,res)
});



const generateGToken=(obj)=>{
    return jwt.sign(obj,process.env.ACCESS_TOKEN_SECRET)
}



module.exports = router