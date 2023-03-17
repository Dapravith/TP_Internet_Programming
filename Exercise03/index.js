const express = require('express');
const path = require("path");
const app = express();
const fs = require('fs');


app.get('/detail', function (req, res) {
    
    fs.readFile('./src/fetchapi-detail.html', null, (err, data) => {
    res.write(data)
    })
});

app.use(express.static(path.join(__dirname+"/src")));
app.listen(3000, () => {
    console.log("The Server is running on port: 3000");
});