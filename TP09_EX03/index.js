const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
var session = require('express-session')


app.use(cors({
    origin: 'http://localhost:3000'
}))


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.use(session({
    secret: 'my-secret',
    resave: true,
    rolling: true,
    saveUninitialized: true,
    name: 'access_token',
    cookie: {
        maxAge: 1000 * 60 * 60 * 2, // 2hours
        sameSite: true,
        secure: false,
    }
}))

// Connect mongodb
require('./config/db')();
app.use(require('./routes'));

app.listen(process.env.PORT || 3001, () => {
    console.log('Your app is available at http://localhost:3001');
});