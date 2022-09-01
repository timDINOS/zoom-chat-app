const mongoose = require("mongoose");
const profile = require("../../types/profile");

const { Schema } = mongoose;


const profileSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    number_of_friends_count: {
        type: Number
    },
    total_time_on_zoom: {
        type: Number
    },
    number_of_meetings_created: {
        type: Number
    },
    number_of_meetings_joined: {
        type: Number
    },
    joined_date: {
        type: Date
    }
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
