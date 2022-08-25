const axios = require('axios');

const getAllUsers = function(req, res) {
    var allUsers;
    axios({
        method: 'get',
        url: '',
        data: {
            query: `
                query allUsers{
                    Users {
                        name
                        email
                        age
                        username
                    }
                }
            `
        }
    }).then((results) => {
        allUsers = results.data;
    })
    .catch((err) => {
        return res.status(500).send({"status": "failed", "message": `${err}`});
    });
    
    return res.status(200).send({"Users": allUsers});
}

module.exports = getAllUsers;