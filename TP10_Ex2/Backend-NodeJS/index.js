const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const session = require('express-session');

const app = express();
app.use(cors("*"));

dotenv.config();

// connect to db
async function connectDb() {
  try {
    await mongoose.connect(process.env.DB_CONNECT);
  } catch (error) {
    console.log(error)
  }
}
connectDb()

app.use(session({
  name: `tp9api`,
  secret: 'my-secret-key', // Replace with your own secret key
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // Set to true if using HTTPS
    maxAge: 10 * 1000,
  },
}))

// middleware
app.use(express.json());

// Route middlewares
app.use('/user', authRoute);

app.listen(process.env.PORT || 3001 , () => console.log(`Server up and running on http://localhost:${process.env.PORT}`));