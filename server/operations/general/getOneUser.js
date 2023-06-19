const axios = require('axios');

const getUser = function(req,res) {
    var user;
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
        for (let i = 0; i < results.data.size; ++i) {
            if (results.data[i].username == req.params.username) {
                user = results.data[i];
                break;
            }
        }
    })
    .catch((err) => {
        return res.status(500).send({"status": "failed", "message": `${err}`});
    });
    
    return res.status(200).send({"User": user});
}

modules.export = getUser;