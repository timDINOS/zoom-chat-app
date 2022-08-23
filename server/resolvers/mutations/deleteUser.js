const deleteUser = async function(_, {username}, {models}) {
    const deleted = await models.Users.deleteOne({_username: username});

    if (deleted.deletedCount > 0) {
        const res = {
            username: username
        }
        return res;
    }
}


module.exports = deleteUser;