const axios = require('axios');

const removeFriend = function(req, res) {
    axios({
        method: 'delete',
        url: '',
        data: {
            query: `
                mutation removeFriend($user: user, $username, username)
                    username
            `
        },
        variables: {
            user: req.session.username,
            username: req.body.username
        }
    }).then((res) => {})
    .catch((err) => {
        return res.status(500).send({"status": "failed", "message": `${err}`});
    });
}

module.exports = removeFriend;