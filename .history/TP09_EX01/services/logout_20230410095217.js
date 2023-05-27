const logout = (session) => {
    try {
        session.jwt = null;
        session.destroy();

        return {
            sucess: true,
        }
    } catch (err) {
        return {
            sucess: false,
            error: err || 'error'
        }
    }
}

module.exports = {
   logout
}