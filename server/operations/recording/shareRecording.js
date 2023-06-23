const getFriends = require('../friends/getFriends.js');
const { createBucket, uploadExternalVideo, hasBucket } = require('./AWSoperations.js');
const rp = require('request-promise');

//body
// 1. Meeting URL
// 2. host username
// 3. bool on whether recording shared to participants only

const retrieveFriends = function (username) {
    axios({
        method: 'get',
        url: '/Users/Friends',
        data: {
            username: username
        }
    })
    .then((response) => {
        return response.data.friends;
    })
    .catch((error) => {
        return null;
    });

    return null;
};

const shareRecording = function (req, res) {
    var allUsers;
    if (res.body.participantsOnly) { //get all participants
        var allParticipants;
        var options = {
            method: 'get',
            uri: `https://api.zoom.us/v2/reports/past_meetings/${req.params.meeting_id}/participants`,
            auth: {
                'Authorization': `BEARER ${token}`
            },
            header: {
                'User-Agent': 'Zoom-api-Jwt-Request',
                'content-type': 'application/json'
            },
            json: true
        };

        rp(options)
        .then((response) => {
            allParticipants = response.data.participants;
        })
        .catch((error) => {
            return res.status(500).send({"status": "failed", "message": `${error}`});
        });

        var allFriends = retrieveFriends(req.body.username);

        if (allFriends == null) {
            return res.status(500).send({"message": "Error retrieving friends"});
        }

        var allResults = allParticipants.map(allParticipants => {allParticipants.name, allParticipants.email});
        while (allResults.length > 0) {
            for (let j = 0; j < allResults.length; j++) {
                if (allResults[0].user_email == allFriends[j].email) {
                        allUsers.push(results.data[0]);
                        allResults.splice(0, 1);
                }
            }
        }
    }
    else {
        allUsers = retrieveFriends(req.body.username);
        if (allUsers == null) {
            return res.status(500).send({"message": "Error retrieving friends"});
        }
    }

    for (let i = 0; i < allUsers.length; i++) { //upload to each user's external bucket (bucket for shared videos)
        if (!hasBucket(allUsers[i].username + "-external")) {
            createBucket(allUsers[i].username + "-external");
        }

        var res = uploadExternalVideo(allUsers[i].username + "-external", req.body.videoname, req.body.username, req.body.username + "_out");
        if (res == 0) {
            return res.status(500).send({"message": "Error uploading video"});
        }
    }

    return res.status(200).send({"message": "Video successfully shared"});
};

modules.export = {shareRecording };