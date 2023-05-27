const logout = (session) => {
    try {
        session.jwt = null;
        session.destroy();

        return {
            success: true,
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