const {token} = require(".../zoom-server");
const rp = require("request-promise");

const createAccount = function(req, res) {
    var options = {
        method: "POST",
        url: "https://api.zoom.us/v2/users",
        data: {
            "action": "create",
            "user_info": {
                "email": req.body.email,
                "first_name": req.body.first_name,
                "last_name": req.body.last_name,
                "type": 1
            }
        },
        auth: {
            'Authorization': `BEARER ${token}`
        },
        headers: {
            'User-Agent': 'Zoom-api-Jwt-Request',
            'content-type': 'application/json'
        },
        json: true
    };

    rp(options)
    .then((result) => {
        return res.status(202).send({"status": "successful"});
    })
    .catch((err) => {
        return res.status(500).send({"status": "failed", "message": `${err}`});
    });
}

module.exports = createAccount;