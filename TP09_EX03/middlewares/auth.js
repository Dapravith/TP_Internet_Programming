const ensureSignedIn = (req, res, next) => {
    if (!req.session.jwt) {
        return res.json({
            success: false,
            error:`You must sign In~`
        })
    }
    next();
}

const ensureSignedOut = (req, res, next) => {
    if (req.session.jwt) {
        return res.json({
            success: false,
            error: `You already signed in~`
        })
    }
    next();
}

module.exports = {
    ensureSignedIn,
    ensureSignedOut
}