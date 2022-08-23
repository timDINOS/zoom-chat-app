

const getUsers = async function(_, {}, {conn}) {
    return await conn.Users.find()
}


module.exports = getUsers;