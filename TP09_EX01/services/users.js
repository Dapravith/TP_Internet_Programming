const Users = require("../models/users")

const findById = async (id) => {
    try {
        const user = await Users.findById(id);
        return {
            success: true,
            data: user
        };
    } catch (err) {
        return {
            success: false,
            error: err|| 'error'
        }
    }
}

module.exports = {
    findById
}