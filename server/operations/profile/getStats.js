const axios = require('axios');

const getStats = function(req, res) {
    var name = ''
    axios({
        method: 'get',
        url: '',
    })
    .then((response) => {
        for (let i = 0; i < response.data.length; ++i) {
            if (response.data[i].username == req.body.username) {
                name = response.data[i].name;
                break;
            }
        }
    })
    .catch((error) => {
        return res.status(500).send({"status": "failed", "message": `${error}`});
    });

    axios({
        method: 'get',
        url: '',
        data: {
            query: `
                query getProfile(user: name) {
                    Profile {
                        name
                        number_of_friends_count
                        total_time_on_zoom
                        number_of_meetings_created
                        number_of_meetings_joined
                        joined_date
                    }
                }
            `
        },
        variables: {
            name: name
        }
    })
    .then((response) => {
        
    })
    .catch((error) => {
        return res.status(500).send({"status": "failed", "message": `${error}`});
    });
}


module.exports = getStats;