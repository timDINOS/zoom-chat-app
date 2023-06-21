const mongoose = require("mongoose");

const { Schema } = mongoose;


const friendSchema = Schema({
    username: {
        type: String,
        trim: true
    },
    friends: [{
        username: {
            type: String,
            trim: true
        },
        date: {
            type: Date
        },
        email: {
            type: String
        }
    }]
});

const Friends = mongoose.model('Friends', friendSchema);

module.exports = {Friends}

