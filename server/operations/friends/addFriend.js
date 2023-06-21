const axios = require('axios');


const addFriend = function(req, res) {
    axios({
        method: 'post',
        url: '',
        data: {
            query: `
                mutation addFriend($user: other_user, $username: username, $email: email) {
                    username
                    email
                }
            `
        },
        variables: {
            other_user: req.body.username,
            username: req.session.username,
            email: req.session.email
        }
    }).then((res) => {})
    .catch((err) => {
        return res.status(500).send({"status": "failed", "message": `${err}`});
    });

    return res.status(202).send({"status": "Success", "friend": `${req.body.username}`});
}


module.exports = addFriend;