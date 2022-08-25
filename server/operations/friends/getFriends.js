const axios = require('axios');

const getFriends = function(req, res) {
    var allFriends;
    axios({
        method: 'get',
        url: '',
        data: {
            query: `
                query getFriends {
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
    }).then((results) => {
        allFriends = results.data;
    })
    .catch((err) => {
        return res.status(500).send({"status": "failed", "message": `${err}`});
    });

    return res.status(200).send({"friends": allFriends});
 }

 module.exports = getFriends;