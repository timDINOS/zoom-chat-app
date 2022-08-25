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


    //Continue deleting other entries associated with User
    return;
}