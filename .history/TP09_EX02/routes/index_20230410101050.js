const express = require('express');
const joiValidation = require('../middlewares/joiValidation');
const { signInSchema, signUpSchema } = require('../schemas');
var router = express.Router();
const { login } = require('../services/login');
const { register } = require('../services/register');
const userService = require('../services/user');
const { logout } = require('../services/logout');



//import service


router.get('/user/:id',  async function (req, res, next) {
    const { id } = req.params;
    
    const result = await userService.findById(id);
    res.json(result);
});

router.post('/logout', async (req, res) => {
    const { email, password } = req.body;
    const user = await login(email, password);
    
    res.json(user);

});

router.post('/login', joiValidation(signInSchema), async (req, res, next) => {

    const { email, password } = req.body;
    const user = await login(email, password);

    res.json(user);

});


router.post('/register',joiValidation(signUpSchema), async (req, res, next) => {

    const createdUser = await register(req.body); 

    res.json(createdUser);

});


module.exports = router;