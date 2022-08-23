const mongoose = require("mongoose");

const { Schema } = mongoose;


const friendSchema = Schema({
    name: {
        type: String,
        trim: true
    },
    friends: [{
        name: {
            type: String,
            trim: true
        },
        date: {
            type: Date
        },
        count: {
            type: Number
        }
    }]
});

const Friends = mongoose.model('Friends', friendSchema);

module.exports = {Friends}

