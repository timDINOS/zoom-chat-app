
const updateUser = async function(_, {username, input}, {models}) {
    const UserToChange = await models.Users.findOne({_username: username});

    Object.keys(input).forEach(field => {
        UserToChange[field] = input[field];
    });

    return await UserToChange.save();
}


module.exports = updateUser;

