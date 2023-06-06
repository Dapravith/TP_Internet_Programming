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

  try {
    const saveUser = await user.save();
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


// update user
router.post('/update-user', verifyToken, async (req, res) => {
  
  const {error} = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const user = await User.findById({_id: req.user._id});

  const usernameExist = await User.findOne({ username: req.body.username });
  if (usernameExist) return res.status(400).send('Username is already existed!');

  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    username: req.body.username
  });

  if (newUser.firstName) user.firstName = newUser.firstName;
  if (newUser.lastName) user.lastName = newUser.lastName;
  if (newUser.email) user.email = newUser.email;
  if (newUser.username) user.username = newUser.username;

  try {
    const saveUser = await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }

})

// update user
router.post('/update-password', verifyToken, async (req, res) => {
  const user = await User.findById({_id: req.user._id});

  const newPassword = req.body.password;

  if (newPassword) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashPassword;
  }

  try {
    const saveUser = await user.save();
    res.send({ status: 'Password was updated successfully!'});
  } catch (error) {
    res.status(400).send(error);
  }

})


// delete user by id
router.post('/delete-user', verifyToken, async (req, res) => {
  try {
    const result = await User.deleteOne({ _id: req.body.id });
    if (result.deletedCount === 1) {
      res.json({ status: 'User was deleted successfully!' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).send(error);
  }

})

module.exports = router;