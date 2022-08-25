

const removeFriend = async function(_, {user, username}, {conn}) {
    await conn.Profile.findOneAndUpdate({username: user}, {
        $dec: {
            count: 1
        }
    });
    await conn.Profile.findOneAndUpdate({username: username}, {
        $dec: {
            count: 1
        }
    });

    await conn.Friends.findOneAndUpdate({username: user}, {
        $pull: {
            "Friends.$.friends": {
                username: username
            }
        }
    });

    await conn.Friends.findOneAndUpdate({username: username}, {
        $pull: {
            "Friends.$.friends": {
                username: user
            }
        }
    });

    return {username: username};
}