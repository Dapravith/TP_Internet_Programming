const mongoose = require('mongoose');

module.exports = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/TP09_IP', {
            autoIndex: true,
            serverSelectionTimeoutMS: 30000 // default 30 seconds
        });
        console.log("MongoDB successfully connected~");

    } catch (err) {
        console.log("Mongoose: ", err);
    }
}