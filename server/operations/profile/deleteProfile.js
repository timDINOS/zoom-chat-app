const axios = require('axios');

const deleteProfile = function(req, res) {
    axios({
        method: 'delete',
        url: '',
        data: {
            query: `
                mutation deleteProfile(user: name):
                    name
            `
        },
        variables: {
            name: req.body.name
        }
    }).then((response) => {
        return res.status(response.status).send({"status": "successful"});
    })
    .catch((error) => {
        return res.status(500).send({"status": "failed", "message": `${error}`});
    });
}

module.exports = deleteProfile;