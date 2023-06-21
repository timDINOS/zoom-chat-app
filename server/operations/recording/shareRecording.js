const axios = require('axios');
const getFriends = require('../friends/getFriends.js');
const { createBucket, uploadExternalVideo, hasBucket } = require('./AWSoperations.js');

//body
// 1. Meeting URL
// 2. host username
// 3. bool on whether recording shared to participants only

const shareRecording = function (req, res) {
    var allUsers;
    if (res.body.participantsOnly) { //get all participants
        var allParticipants;
        axios(); //get all participants via zoom api

        axios('/users/friends', {
            method: 'get',
            params: {
                username: req.body.username
            }
        }).then((results) => {
            var allResults = allParticipants.map(allParticipants => {allParticipants.name, allParticipants.email});
            while (results.data.length > 0) {
                for (let j = 0; j < allResults.length; j++) {
                    if (results.data[0].user_email == allResults[j].email) {
                        allUsers.push(results.data[0]);
                        results.data.splice(0, 1);
                    }
                }
            }
        }).catch((err) => {
            return res.status(500).send({"status": "failed", "message": `${err}`});
        });
    }
    else {
        axios('/users/friends', {
            method: 'get',
            params: {
                username: req.body.username
            }
        }).then((results) => {
            allUsers = results.data;
        }).catch((err) => {
            return res.status(500).send({"status": "failed", "message": `${err}`});
        }); //get all usernames
    }

    for (let i = 0; i < allUsers.length; i++) { //upload to each user's external bucket (bucket for shared videos)
        if (!hasBucket(allUsers[i].username + "-external")) {
            createBucket(allUsers[i].username + "-external");
        }

        var res = uploadExternalVideo();
        if (res == 0) {
            return res.status(500).send({"message": "Error uploading video"});
        }
    }

    return res.status(200).send({"message": "Video successfully shared"});
};

modules.export = {shareRecording };