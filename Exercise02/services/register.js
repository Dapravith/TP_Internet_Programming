const Users = require("../db/user");
const { writeUsers , readUsers} = require('../db/db');

const register = (parame) => {
    try {
        const {
            email,
            username,
            firstName,
            lastName,
            password
        } = parame;

        // Read all users


        const users = readUsers();

        // check if user exists

        console.log(users.length)
        for(let i=0;i<users.length;i++){
            //console.log(users[i].email)
            if(users[i].email == parame.email){
                console.log("User is already existed~")
                throw "User is already existed~";
            }
        }
         
        // Save to db

        Users.push(parame);
        writeUsers(Users);
        
        // Return a complete user's info
        return {
            success: true,
            data: parame,
        }
    } catch (err) {
        return {
            success: false,
            err: err || 'error'
        }
    }
}
module.exports = {
    register,
}