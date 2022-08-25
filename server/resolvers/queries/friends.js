const getFriends = async function(_, {}, {conn}) {
    return await conn.Friends.find();
}


module.exports = getFriends;