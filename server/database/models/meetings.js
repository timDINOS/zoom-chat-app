const mongoose = require("mongoose");

const { Schema } = mongoose;

const meetingSchema = new Schema({
    username: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    meetings: [{
        topic: {
            type: String,
            trim: true
        },
        meeting_url: {
            type: String,
            trim: true
        },
        meeting_id: {
            type: String,
            trim: true
        },
        created: {
            type: Date,
            trim: true
        },
        recorded: {
            type: Boolean,
            trim: true
        }
    }]
});

const Meetings = mongoose.model('Meetings', meetingSchema);

module.exports = {Meetings}
