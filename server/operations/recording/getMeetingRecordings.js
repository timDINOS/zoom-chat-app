const axios = require('axios');

const {getAllRecordings } = require('./AWSoperations.js');

const getMeetingRecordings = function(req, res) {
    var allRecordings = getAllRecordings(req.body.username);

    if (allRecordings.size == 0) {
        return res.status(200).send({"status": "failed", "message": "No recordings found"});
    }

    return res.status(200).send({"status": "success", "recordings": allRecordings});
}


module.exports = getMeetingRecordings;