const {token} = require(".../zoom-server");
const rp = require("request-promise");


const checkAccount = function(req, res) {
    var options = {
        method: "GET",
        uri: `https://api.zoom.us/v2/users/me`,
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
    .then((results) => {
        return res.status(200).send({"hasAccount": true});
    })
    .catch((err) => {
        return res.status(404).send({"hasAccount": false});
    });
}

module.exports = checkAccount;