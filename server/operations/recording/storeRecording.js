const rp = require("request-promise");
const http = require("http");
const fs = require("fs");

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
    
}