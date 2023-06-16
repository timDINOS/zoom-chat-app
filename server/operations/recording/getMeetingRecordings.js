const axios = require('axios');

const {getAllRecordings } = require('./AWSoperations.js');

const getMeetingRecordings = function(req, res) {
    var allRecordings = getAllRecordings(req.body.username);

    if (allRecordings.size == 0) {
        return res.status(200).send({"status": "failed", "message": "No recordings found"});
    }

    return res.status(200).send({"status": "success", "recordings": allRecordings});
}

const getSpecificRecording = function(req, res) {
    var allRecordings = getAllRecordings(req.body.username);

    if (allRecordings.size == 0) {
        return res.status(500).send({"status": "failed", "message": "No recordings found"});
    }

    var recording = allRecordings[0][url];

    for (let i = 0; i < allRecordings.size; ++i) {
        if (allRecordings[i][key] == req.body.key) {
            var recording = allRecordings[i][url];
            break;
        }
    }

    return res.status(200).send({"status": "success", "recording": recording});
}


module.exports = {getMeetingRecordings, getSpecificRecording};