const Jwt = require('jsonwebtoken');

const createAsessionToken = (userID, email) => {
    return Jwt.sign({
        _id: userID,
        email,
    }, 'jwt-secret');
    
}

module.exports = {
    createAsessionToken
}