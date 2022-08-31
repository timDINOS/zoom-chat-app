const axios = require('axios');

const getAllMeetings = function(req, res) {
    axios({
        method: 'GET',
        url: '',
        data: {
            query: `
                query getMeetings{
                    Meetings{
                        name
                        meetings{
                            meeting_url
                            meeting_id
                            topic
                            created
                            recorded
                        }
                    }
                }
            `
        }
    })
    .then((response) => {
        return res.status(200).send({"meetings": response.data});
    })
    .catch((error) => {
        return res.status(500).send({"status": "failed", "message": `${error}`});
    });
};


module.exports = getAllMeetings;