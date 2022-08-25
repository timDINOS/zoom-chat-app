const Users = require('./users');
const {Friend, Friends } = require('./friends');
const {meetings, Meetings} = require('./meetings');

module.exports = [
    Users,
    Friend,
    Friends,
    meetings, 
    Meetings
];