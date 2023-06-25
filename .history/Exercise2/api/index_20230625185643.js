require('dotenv').config()
const express = require('express')
var session = require('express-session')
const path=require("path")
const app = express()

app.use("/static",express.static(path.join(__dirname, 'static')));

var cors = require('cors')



app.use(cors("*"))
app.use(express.json())

app.use(require("./src/config/session"))

//Main 
app.get('/',(req,res)=>{
    res.sendFile("./src/templates/index.html",{root:'./'})
})

app.use("/api",require("./src/main"))




require("./src/config/db")()

// console.log(require("./src/config/session")());




app.listen(process.env.PORT,()=>{
    console.log(`Server run successfull on http://localhost:${process.env.PORT}`);
})

