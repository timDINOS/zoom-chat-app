require('dotenv').config();

const mongoose = require('mongoose');

const db_url = process.env.DATABASE_URL;

const connectToDB = function() {
    return mongoose.connect(db_url, {useUnifiedTopology: true, userNewUrlParser: true}, err => {
        if (err) {
            console.log("connection failed");
        }
    })
}

mongoose.connection.on('error', console.error.bind("connection failed"));


module.exports = connectToDB