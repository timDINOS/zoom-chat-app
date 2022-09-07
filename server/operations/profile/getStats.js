const { findDir } = require('@vue/compiler-core');
const axios = require('axios');

const getStats = function(req, res) {
    var name = ''
    var users;
    axios({
        method: 'get',
        url: '',
    })
    .then((response) => {
        users = response.data;
        for (let i = 0; i < response.data.length; ++i) {
            if (response.data[i].username == req.body.username) {
                name = response.data[i].name;
                break;
            }
        }
    })
    .catch((error) => {
        return res.status(500).send({"status": "failed", "message": `${error}`});
    });

    var profileStats = {}

    axios({
        method: 'get',
        url: '',
        data: {
            query: `
                query getProfile(user: name) {
                    Profile {
                        name
                        number_of_friends_count
                        total_time_on_zoom
                        number_of_meetings_created
                        number_of_meetings_joined
                        joined_date
                    }
                }
            `
        },
        variables: {
            name: name
        }
    })
    .then((response) => {
        profileStats['name'] = response.data.name;
        profileStats['number_of_friends'] = response.data.number_of_friends_count;
        profileStats['total_time_on_zoom'] = response.data.total_time_on_zoom;
        profileStats['number_of_meetings_created'] = response.data.number_of_meetings_created;
        profileStats['number_of_meetings_joined'] = response.data.number_of_meetings_joined;
        profileStats['joined_date'] = response.data.joined_date;
    })
    .catch((error) => {
        return res.status(500).send({"status": "failed", "message": `${error}`});
    });

    var usersFriends = []
    var totalTimeSpent = []
    var numMeetingsCreated = []
    var numMeetingsJoined = []

    for (let x = 0; x < users.length; ++x) {
        axios({
            method: 'get',
            url: '',
            data: {
                query: `
                    query getProfile(user: name) {
                        Profile {
                            name
                            number_of_friends_count
                            total_time_on_zoom
                            number_of_meetings_created
                            number_of_meetings_joined
                            joined_date
                        }
                    }
                `
            },
            variables: {
                name: users[i].name
            }
        })
        .then((response) => {
            usersFriends.append([response.data.name, response.data.number_of_friends_count]);
            totalTimeSpent.append([response.data.name, response.data.total_time_on_zoom]);
            numMeetingsCreated.append([response.data.name, response.data.number_of_meetings_created]);
            numMeetingsJoined.append([response.data.name, response.data.number_of_meetings_joined]);
        })
        .catch((error) => {
            return res.status(500).send({"status": "failed", "message": `${error}`});
        });
    }

    usersFriends.sort((a, b) => b[1] - a[1]);
    totalTimeSpent.sort((a, b) => b[1] - a[1]);
    numMeetingsCreated.sort((a, b) => b[1] - a[1]);
    numMeetingsJoined.sort((a, b) => b[1] - a[1]);

    for (let x = 0; x < usersFriends.length; ++x) {
        if (usersFriends[x][0] === name) {
            profileStats['user_friend_count_rank'] = {}
            profileStats['user_friend_count_rank']['top'] = x+1;
            profileStats['user_friend_count_rank']['botton'] = usersFriends.length - x+1;
            break;
        }
    }

    for (let y = 0; y < totalTimeSpent.length; ++y) {
        if (totalTimeSpent[y][0] === name) {
            profileStats['total_time_rank'] = {}
            profileStats['total_time_rank']['top'] = y+1;
            profileStats['total_time_rank']['botton'] = totalTimeSpent.length - y+1;
        }
    }

    for (let z = 0; z < numMeetingsCreated.length; ++z) {
        if (numMeetingsCreated[y][0] === name) {
            profileStats['created_rank'] = {}
            profileStats['created_rank']['top'] = z+1;
            profileStats['created_rank']['botton'] = numMeetingsCreated.length - y+1;
        }
    }

    for (let z = 0; z < numMeetingsJoined.length; ++z) {
        if (numMeetingsCreated[y][0] === name) {
            profileStats['joined_rank'] = {}
            profileStats['joined_rank']['top'] = z+1;
            profileStats['joined_rank']['botton'] = numMeetingsJoined.length - y+1;
        }
    }

    var meetings = '';

    axios({
        method: 'get',
        url: ''
    })
    .then((response) => {
        for (let x = 0; x < response.data.length; ++x) {
            if (response.data[x].name == name) {
                meetings = response.data[x].meetings;
                break;
            }
        }
    })
    .catch((error) => {
        return res.status(500).send({"status": "failed", "error": `${error}`});
    });

    var meetings_length = []
    var participants_count_record = []

    for (let i = 0; i < meetings.length; ++i) {
        axios({
            method: 'get',
            url: ''
        })
        .then((response) => {
            const date2 = response.data.end_time;
            const date1 = response.data.start_time;
            const timeElapsed = Math.abs(date2 - date1);
            meetings_length.append([response.data.topic, (timeElapsed/(1000 * 60))]);
            participants_count_record.append([response.data.topic, response.data.participants_count]);
        })
        .catch((error) => {
            return res.status(500).send({"status": "failed", "error": `${error}`});
        })
    }

    meetings_length.sort((a, b) => b[1] - a[1]);
    participants_count_record.sort((a, b) => b[1] - a[1]);

    var friends = []

    axios({
        method: 'get',
        uri: ''
    })
    .then((response) => {
        for (let x = 0; x < response.data.length; ++x) {
            if (response.data[x].name == name) {
                friends = response.data[x].friends;
                break;
            }
        }
    })
    .catch((error) => {
        return res.status(500).send({"status": "failed", "error": `${error}`});
    });

    var longest_friend = ''
    var shortest_friend = ''

    var max_friendship = 0
    var min_friendship = MAX_VALUE

    for (let m = 0; m < friends.length; ++m) {
        var diff = abs(new Date() - friends[m].date);
        if (diff > max_friendship) {
            max_friendship = diff;
            longest_friend = friends[m].name;
        }
    }

    profileStats['friend_with_longest_conn'] = longest_friend;

    for (let n = 0; n < friends.length; ++n) {
        var diff = abs(new Date() - friends[n].date);
        if (diff < min_friendship) {
            min_friendship = diff;
            shortest_friend = friends[n].name;
        }
    }

    profileStats['friend_with_shortest_conn'] = shortest_friend;

    return profileStats;
}

module.exports = getStats;