const mongoose = require('mongoose');

module.exports = async() => {
    try {
        await mongoose.connect('mongodb://localhost:27017/mydatabaseEx02', {
            autoIndex: true,
            serverSelectionTimeoutMS: 30000 // default 30 seconds
        });
        console.log("MongoDB Succefully connected~");

    } catch (err) {
        console.log("Mongoose: ", err);
    }

}