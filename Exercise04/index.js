const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.static('src/'));

app.get('/', (req, res) => {
  fs.readFile('./src/index.html', 'utf8', (err, data) => {
    if (err) {
      //If there's an error send request status 
      res.status(500).send('Error reading file');
    } else {
      res.send(data);
    }
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});