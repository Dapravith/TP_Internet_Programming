const { json, request } = require('express');
const User = require('../model/User');
const { registerValidation, loginValidation } = require('../validation')
const router = require('express').Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const verifyToken = require('./verifyToken');

// register user
router.post('/register', async (req, res) => {
  // do validation
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const usernameExist = await User.findOne({ username: req.body.username });
  if (usernameExist) return res.status(400).send('Username is already existed!');

  // Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  // create new user for adding new
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    password: hashPassword
    
  });

  // try to add, so we need sometime. thus we use async and await
  try {
    const saveUser = await user.save();
    // send response when the user is successfully saved
    // res.send(saveUser);
    res.send({user: user._id});
  } catch (error) {
    res.status(400).send(error);
  }
});


// login
router.post('/login', async (req, res) => {
  const {error} = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({username: req.body.username});
  if (!user) return res.status(400).send('Username or password is incorrect!');
  // if password is correct
  const validPasswd = bcrypt.compare(req.body.password, user.password);
  if (!validPasswd) return res.status(400).send('Username or password is incorrect!');

  // create and assign a token
  const expiresIn = '1h'; // Set the expiration time (e.g., 1 hour)
  const token = jwt.sign({_id: user.id}, process.env.TOKEN_SECRET, { expiresIn });
  req.session.jwt = token;
  // console.log(req.session.jwt);
  res.header('auth-token', token).send(token);
})


// when the user login succesed
router.get('/home', verifyToken, async (req, res) => {
  res.send(req.user);
})


// get infor about me
router.get('/me', verifyToken, async (req, res) => {
  const user = await User.findById({_id: req.user._id});
  res.send(user);
})

module.exports = router;