const { readUsers } = require('../db/db');

const login = (email, password) => {

    try {
        const users = readUsers();

         // check if user existed
        const index = users?.findIndex(users => users.email == email);
        console.log(users)
        if (index < 0) 
            throw 'The user is not found~'

        const user = users[index];
        console.log("users:"+ users[index].email + "; pwd:" + password)

        // check if password matched
        if (user?.password != password) {
            throw 'The user information is incorrect~'
        }


        // return user's information
        return {
            suscess: true,
            data: user,
        }
        
    }  catch (err) {
        return {
            success: false,
            err: err || 'error'
        }
    }
}

module.exports = {
    login,
}