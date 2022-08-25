const getMeetings = async function(_, {}, {conn}) {
    return await conn.Meetings.find();
}


module.exports = getMeetings;