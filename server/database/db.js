const mongoose = require('mongoose');


const connectToDB = function() {
    return mongoose.connect({useUnifiedTopology: true, userNewUrlParser: true}, err => {
        if (err) {
            console.log("connection failed");
        }
    })
}

mongoose.connection.on('error', console.error.bind("connection failed"));


module.exports = connectToDB