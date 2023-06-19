const {token} = require(".../zoom-server");
const axios = require("axios");

const createMeeting = function(req, res) {
    var options = {
        method: "POST",
        uri: "https://api.zoom.us/v2/users/me/meetings",
        data: {
            "topic": `${req.body.topic}`,
            "type": 1,
            "settings": {
                "waiting_room": false,
                "host_vide": true,
                "mute_upon_entry": false,
                "host_video": true,
                "participant_video": true
            },
            "auto_recording": `${req.body.record.mode}`
        },
        auth: {
            'Authorization': `BEARER ${token}`
        },
        headers: {
            'User-Agent': 'Zoom-api-Jwt-Request',
            'content-type': 'application/json'
        },
        json: true
    }

    var topic;
    var url;
    var meeting_id;
    var created_time;

    rp(options)
    .then((response) => {
        topic = response.data.topic;
        url = response.data.join_url;
        meeting_id = response.data.meeting_id;
        created_time = response.data.created_at;
    })
    .catch((err) => {
        return res.status(500).send({"status": "failed", "message": `${err}`});
    });

    var entry = {
        topic: topic,
        meeting_url: url,
        meeting_id: meeting_id,
        created: created_time,
        recorded: req.body.recording.recorded
    };

    var new_meeting = {}

    axios({
        method: 'post',
        url: '',
        data: {
            query: `
                mutation createMeeting($user: username, $email: email, $input: meeting): 
                    meeting
            `
        },
        variables: {
            username: req.session.username,
            email: req.body.email,
            meeting: entry
        }
    }).then((results) => {
        new_meeting = results.data;
    })
    .catch((err) => {
        return res.status(500).send({"status": "failed", "message": `${err}`});
    });

    return res.status(202).send({
        "status": "success",
        "meeting": new_meeting
    });
}

const joinMeeting = function(req, res) {
    var options = {
        method: "GET",
        uri: `https://api.zoom.us/v2/meetings/${req.params.meetindId}`,
        auth: {
            'Authorization': `BEARER ${token}`
        },
        header: {
            'User-Agent': 'Zoom-api-Jwt-Request',
            'content-type': 'application/json'
        },
        json: true
    };

    var url = "";

    rp(options)
    .then((response) => {
        url = response.data.join_url;
        return res.status(200).send({"url": `${url}`});
    })
    .catch((err) => {
        return res.status(500).send({"status": "failed", "message": `${err}`});
    });
}

const deleteMeeting = function(req, res) {
    var entry = {}
    axios({
        method: 'get',
        url: '',
        data: {
            query: `
            `
        }
    })
    .then((response) => {
        entry = response.data
    })
    .catch((error) => {
        return res.status(500).send({"status": "failed", "message": `${error}`});
    });

    var options = {
        method: 'DELETE',
        uri: `https://api.zoom.us/v2/meetings/${req.params.meetindId}`,
        auth: {
            'Authorization': `BEARER ${token}`
        },
        header: {
            'User-Agent': 'Zoom-api-Jwt-Request',
            'content-type': 'application/json'
        },
        json: true
    }

    rp(options)
    .then((response) => {})
    .catch((error) => {
        return res.status(500).send({"status": "failed", "message": `${error}`});
    });

    axios({
        method: 'delete',
        url: '',
        data: {
            query: `
                mutation deleteMeeting(input: entry):
                    meeting_id
            `
        },
        variables: {
            entry: entry
        }
    })
    .then((response) => {
        return res.status(204).send({"status": "successful", "deleted": true});
    })
    .catch((error) => {
        return res.status(500).send({"status": "failed", "message": `${error}`});
    });
}

const getMeetingInfo = function(req, res) {
    //
    var meetingInfo = {}
    var meeting_options = {
        method: 'get',
        uri: `https://api.zoom.us/v2/reports/meetings/${req.params.meetindId}`,
        auth: {
            'Authorization': `BEARER ${token}`
        },
        header: {
            'User-Agent': 'Zoom-api-Jwt-Request',
            'content-type': 'application/json'
        },
        json: true
    }

    rp(meeting_options)
    .then((response) => {
        meetingInfo.topic = response.data.topic;
        meetingInfo.duration = response.data.duration;
        meetingInfo.participants_count = response.data.participants_count;
        meetingInfo.user_name = response.data.user_name;
    })
    .catch((error) => {
        return res.status(500).send({"status": "failed", "message": `${error}`});
    });

    var participant_records = {
        method: 'get',
        uri: `https://api.zoom.us/v2/reports/meetings/${req.params.meetindId}/participants`,
        auth: {
            'Authorization': `BEARER ${token}`
        },
        header: {
            'User-Agent': 'Zoom-api-Jwt-Request',
            'content-type': 'application/json'
        },
        json: true
    }

    rp(participant_records)
    .then((response) => {
        var users = []
        for (let i = 0; i < response.data.participants.length; ++i) {
            var entry = {}
            entry.name = response.data.participants[i].name;
            entry.join_time = response.data.participants[i].join_time;
            entry.leave_time = response.data.participants[i].leave_time;
            users.append(entry);
        }
        meetingInfo.participants = users;
    })
    .catch((error) => {
        return res.status(500).send({"status": "failed", "message": `${error}`});
    });

    return res.status(200).send({"info": meetingInfo});
}

module.exports = { createMeeting, joinMeeting, deleteMeeting, getMeetingInfo};

