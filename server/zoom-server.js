const express = require("express");
const app = express();
const { createMeeting, joinMeeting, deleteMeeting, getMeetingInfo } = require('./operations/meeting/meeting_api');
const server = require("./server");
const logout = require("./operations/user_auth/logout");
const login = require("./operations/user_auth/login");
const register = require("./operations/user_auth/register");
const changePassword = require("./operations/user_auth/change_password");
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

//Create Meeting
app.post('/meeting/create', createMeeting);

//Get Meeting Info
app.get('/meeting/join', joinMeeting);

//Delete Meeting
app.delete('/meeting/delete', deleteMeeting);

//Get all Info about Meeting 
app.get('/meeting/info', getMeetingInfo);



app.post("/users/login", login);

app.post("/users/logout", logout);

app.post("/users/register", register);

app.put("/users/changePassword", change_password);


app.post()

app.listen(process.env.ZOOM_PORT, function(err) {
    if (err) {
        console.log("Error is connecting to zoom meeting server");
    }
});

module.exports = session;
