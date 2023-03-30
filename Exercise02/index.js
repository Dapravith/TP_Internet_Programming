const express = require('express');

const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');


app.use(cors({
    origin: 'http://localhost:3000'
}))

// post public file to call .js to .html for write js
var path = require('path');
var public = path.join(__dirname, '');
app.get('/', express.static(public));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



const routes = require('./routes');
app.use(routes);

//app.use(require('./routes'));

app.listen(3001, () => {
    console.log('Server start on at http://localhost:3001');
});