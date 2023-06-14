const rp = require("request-promise");
const http = require("http");
const fs = require("fs");

const { createBucket, uploadVideo, hasBucket} = require("./AWSoperations");

const storeRecording = function(req, res) {
    var options = {
        method: "GET",
        uri: `https://api.zoom.us/v2/meetings/${req.body.meeting_id}/recordings`,
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
    .then((result) => {
        var filename = `recording${req.body.meeting_id}.mp4`;
        const file = fs.createWriteStream(filename);
        const request = http.get(result.recording_files.download_url, function(response) {
            response.pipe(file);

            file.on("finish", function() {
                file.close();
            });
        }).on("error", function(err) {
            fs.unlink(filename);
            return res.status(500).send({"status": "failed", "message": `${err}`});
        });

        
    }).catch((err) => {
        return res.status(500).send({"status": "failed", "message": `${err}`});
    });

    var bucketname = res.body.account_id;

    if (!hasBucket(bucketname)) {
        const bucketRes = createBucket(bucketname);
        if (bucketRes == 0) {
            return res.status(500).send({"status": "failed", "message": "Error creating bucket"});
        }
    }

    const fileStream = fs.createReadStream(filename);

    const uploadRes = uploadVideo(filename, filestream, bucketname);
    if (uploadRes == 0) {
        return res.status(500).send({"status": "failed", "message": "Error uploading video to S3"});
    }
    return res.status(200).send({"status": "successful"});
};

module.exports = storeRecording;