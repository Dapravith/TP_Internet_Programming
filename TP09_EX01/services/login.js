const Users = require("../models/users");

const login = async (email, password) => {
    try {
     // check if email existed
     const user = await Users.findOne({email});
     if (!user) {
        throw 'The user is not found~'
     }
     if (!user.macthesPassword(password)) {
        throw "The user's information is incorrect~"
     }
     return {
        sucess: true,
        data: null,
     }
    } catch (err) {
        return {
            sucess: false,
            err: err || 'error'
        }
    }
};

module.exports = {
    login
}