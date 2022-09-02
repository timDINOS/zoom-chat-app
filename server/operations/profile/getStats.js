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

    var profileStats = {}

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
        profileStats['name'] = response.data.name;
        profileStats['number_of_friends'] = response.data.number_of_friends_count;
        profileStats['total_time_on_zoom'] = response.data.total_time_on_zoom;
        profileStats['number_of_meetings_created'] = response.data.number_of_meetings_created;
        profileStats['number_of_meetings_joined'] = response.data.number_of_meetings_joined;
        profileStats['joined_date'] = response.data.joined_date;
    })
    .catch((error) => {
        return res.status(500).send({"status": "failed", "message": `${error}`});
    });

    
}

module.exports = getStats;