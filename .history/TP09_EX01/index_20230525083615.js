const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(cors({
    origin: "http://localhost:3000"
}))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//connect mongodb

require('./config/db')();
app.use(require('./routes'));

app.listen(process.env.PORT || 3001, () => {
    console.log('Your app is available on at http://localhost:3001');
});