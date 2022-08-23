const createUser = async function(_, {input}, {conn}) {
    User = await conn.Users.create(input);
    return User;
}

module.exports = createUser;
