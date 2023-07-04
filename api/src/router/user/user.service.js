const User=require('../../model/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports=class userService{
    async login(data, req, res) {

        let user = await User.findOne({ username: data.EUID });
        if (!user) user = await User.findOne({ email: data.EUID });
        if (!user) return res.status(400).send({ "message": "Email or Password incorrect" });
      
        const passwordsMatch = await bcrypt.compare(data.password, user.password);
        if (!passwordsMatch) return res.status(400).send({ "message": "Email or Password incorrect" });
        
        // delete user.password;
      
        const token = this.generateGToken({ id: user._id });
      
        req.session.token = `Bearer ${token}`;
        return res.json({
          token: token,
          user: user,
          msg: "Login successful"
        });
      }
      

    async register(data,req,res){

        if(data.password!=data.repeat_password) return  res.status(400).send({"msg":"Password and Repeat password not match"})
        const salt= await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(data.password,salt)
        const user=new User({
            username:data.username,
            email:data.email,
            password:hashPassword,
            firstname:data.firstname,
            lastname:data.lastname,
        })
        
        try{
            const userSaved=await user.save();
            const token=this.generateGToken({id:userSaved._id})
            req.session.token=`Bearer ${token}`
            return res.json({
                token:token,
                user:userSaved,
                msg:"Register successfull"
            })
        }catch(err) {
            // console.log(err);
            return res.json({"Message":"Credentail already token"});
        }
    }


    async loggout(req,res){
        res.clearCookie('connect.sid');
    
        // Destroy the session
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
                res.status(500).send('An error occurred while logging out.');
            } else {
                res.json({msg:"Logout successfull"}) // Redirect the user to the login page or any desired page
            }
        });
    }

    generateGToken(obj){
        return jwt.sign(obj,process.env.ACCESS_TOKEN_SECRET)
    }
}