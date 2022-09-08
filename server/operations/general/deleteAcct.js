const axios = require('axios');



const deleteAccount = function(req, res) {
    axios({
        method: 'delete',
        url: '',
        data: {
            query: `
                mutation deleteUser($username: username) {
                    username
                }
            `
        },
        variables: {
            username: req.body.username
        }
    }).then((res) => {})
    .catch((err) => {
        return res.status(500).send({"status": "failed", "message": `${err}`});
    });

    var allUsers;
    axios({
        method: 'get',
        url: '',
        data: {
            query: `
                query QueryAllFriends{
                    Friends {
                        name
                        friends {
                            name
                            date
                        }
                    }
                }
            `
        }
    }).then((response) => {allUsers = response.data})
    .catch((err) => {
        return res.status(500).send({"status": "failed", "message": `${err}`});
    });

    var userFriends = [];
    for (let i = 0; i < allUsers.length; ++i) {
        if (allUsers[i].username == req.body.username) {
            userFriends = allUsers[i].friends;
            break;
        }
    }

    for (let j = 0; j < userFriends.length; ++j) {
        axios.delete('', {
            data: {
                username: userFriends[j].username
            }
        }).then((result) => {})
        .catch((err) => {
            return res.status(500).send({"status": "failed", "message": `${err}`});
        });
    }

    var meetings = []

    axios({
        method: 'get',
        url: ''
    })
    .then((response) => {
        meetings = response.data;
    })
    .catch((error) => {
        return res.status(500).send({"status": "failed", "message": `${error}`});
    });

    var userMeetings;

    for (let i = 0; i < meetings.length; ++i) {
        if (meetings[i].name == req.body.name) {
            userMeetings = meetings[i];
            break;
        }
    }

    for (let j = 0; j < userMeetings.meetings.length; ++j) {
        axios({
            method: 'delete',
            uri: ''
        })
        .then((response) => {})
        .catch((error) => {
            return res.status(500).send({"status": "failed", "message": `${error}`});
        });
    }

    axios({
        method: 'delete',
        url: '',
        data: {
            name: req.body.name
        }
    })
    .then((response) => {})
    .catch((error) => {
        return res.status(500).send({"status": "failed", "message": `${error}`});
    });

    axios({
        method: 'post',
        url: '/logout'
    })
    .then((response) => {})
    .catch((error) => {
        return res.status(500).send({"status": "failed", "message": `${error}`});
    });
    //Continue deleting other entries associated with User
    return res.status(200).send({"status": "deleted User"});
}