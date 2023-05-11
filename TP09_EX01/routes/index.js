const experess = require('express');
var router = experess.Router();
const { login } = require('../services/login');
const { register } = require('../services/register');
const userService = require('../services/users');
const { logout } = require('../services/logout');

//import service

router.get('/user/:id', async function (req, res, next) {
    const { id } = req.params;

    const result = await userService.findById(id);
    res.json(result);
});

router.post('/logout', async (req, res) => {
    const { email, password } = req.body;
    const user = await login(email, password);

    res.json(result);
});

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    const user = await login(email, password);

    res.json(user);
});

router.post('register', async(req,res, next) => {
    const createdUser = await register(req.body);

    res.json(createdUser);
});

module.exports = router;
