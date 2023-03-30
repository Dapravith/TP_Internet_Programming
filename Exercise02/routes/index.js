const express = require('express');
const router = express.Router();
//import service

const { login } = require('../services/login');
const { register } = require('../services/register');


router.post('/login', (req, res) => {

    const { email, password } = req.body;

    const result = login(email, password)

    res.json(result);

})


router.post('/register', function(req, res) {

    const result = register(req.body);
    res.json(result);

    //res.send("Hello from API in Detail");

})


router.post('/Home', (req, res) => {

    const { email, password } = req.body;

    const result = login(email, password)

    res.json(result);

})

module.exports = router;