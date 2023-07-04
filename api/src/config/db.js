const mongoose = require('mongoose');

module.exports= async()=>{
    try {
        await mongoose.connect(`${process.env.DB_CONNECTION}`);
        console.log("CONNECTED");
      } catch (error) {
        // console.log("SOMETHING WHEN WRONG");
        console.log(error);
      }
}