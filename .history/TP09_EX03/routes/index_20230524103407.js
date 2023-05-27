const express = require('express');
const joiValidation = require('../middlewares/joiValidation');
const auth = require('../middlewares/auth');
const { signInSchema, signUpSchema } = require('../schemas');
var router = express.Router();
const { login } = require('../services/login');
const { register } = require('../services/register');
const { createAsessionToken } = require('../services/utils');
const userService = require('../services/user');
const { logout } = require('../services/logout');



//import service


router.get('/user/:id', auth.ensureSignedIn, async function(req, res, next) {
    const { id } = req.params;
    const result = await userService.findById(id);
    res.json(result);
});

router.post('/logout', auth.ensureSignedIn, async(req, res) => {

    const result = logout(req.session);
    res.json(result);

});

router.post('/login', auth.ensureSignedOut, joiValidation(signInSchema), async(req, res, next) => {

    const { email, password } = req.body;
    const user = await login(email, password);

    const token = createAsessionToken(user._id, user.email);
    req.session.jwt = token;

    res.json(user);

});


router.post('/register', auth.ensureSignedOut, joiValidation(signUpSchema), async(req, res, next) => {

    const createdUser = await register(req.body);
    //console.log(req.body);
    // console.log(createdUser);
    res.json(createdUser);

});


module.exports = router;