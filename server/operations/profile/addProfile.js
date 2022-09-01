const axios = require('axios');

const addProfile = function(req, res) {
    var profile = {
        name: req.body.name,
        number_of_friends_count: 0,
        total_time_on_zoom: 0,
        number_of_meetings_created: 0,
        number_of_meetings_joined: 0,
        joined_date: req.body.date
    }

    axios({
        method: 'post',
        url: '',
        data: {
            query: `
                mutation addProfile(input: newProfile):
                    profile
            `
        },
        variables: {
            newProfile: profile,
            profile: profile
        }
    })
    .then((response) => {
        return res.status(202).send({"status": "successful", "profile": profile});
    })
    .catch((error) => {
        return res.status(500).send({"status": "failure", "message": `${error}`});
    });
}


module.exports = addProfile;