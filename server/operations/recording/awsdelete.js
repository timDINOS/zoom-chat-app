const { deleteObject, deleteBucket } = require('./AWSoperations');

const deleteRecording = function (req, res) {
    var status = deleteObject(req.body.username, req.body.recordingName);
    if (status == 0) {
        return res.status(400).send({ "status": "error" });
    }
    return res.status(200).send({ "status": "success" });
};

const deleteUserBucket = function (req, res) {
    var status = deleteBucket(req.body.username);
    if (status == 0) {
        return res.status(400).send({ "status": "error" });
    }
    return res.status(200).send({ "status": "success" });
};

module.exports = { deleteRecording, deleteUserBucket };