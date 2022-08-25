const express = require("express");
const app = express();
const { createMeeting, joinMeeting, deleteMeeting, getMeetingInfo } = require('./operations/meeting/meeting_api');
const server = require("./server");
const logout = require("./operations/user_auth/logout");
const login = require("./operations/user_auth/login");
const register = require("./operations/user_auth/register");
const changePassword = require("./operations/user_auth/change_password");
const addFriends = require("./operations/friends/addFriend");
const removeFriends = require("./operations/friends/removeFriend");
const getFriends = require("./operations/friends/getFriends");
const getAllUsers = require("./operations/general/getAllUsers");
const bodyParser = require('body-parser');
const sessions = require('expess-session');
const cookies = require('cookie-parser');


app.use(bodyParser.json());

app.use(express.urlencoded({extended: true}));

app.use(cookies());

app.use(sessions({
    secret: "something",
    name: "zoomSessions",
    saveUninitialized: false
}));

server.applyMiddleware({app, path: "/api/graphql"});


//Meetings

//Create Meeting
app.post('/meeting/create', createMeeting);

//Get Meeting Info
app.get('/meeting/join', joinMeeting);

//Delete Meeting
app.delete('/meeting/delete', deleteMeeting);

//Get all Info about Meeting 
app.get('/meeting/info', getMeetingInfo);


//User Auth
app.post("/users/login", login);

app.post("/users/logout", logout);

app.post("/users/register", register);

app.put("/users/changePassword", changePassword);


//Friends
app.post("/users/friends", addFriends);

app.get("/users/friends", removeFriends);

app.delete("/users/friends", getFriends);


//All Users/Profile
app.get("/users", getAllUsers);

app.delete("/users", );

app.get("/users/meetings", );

app.get("/users/stats", );

app.listen(process.env.ZOOM_PORT, function(err) {
    if (err) {
        console.log("Error is connecting to zoom meeting server");
    }
});

module.exports = session;
