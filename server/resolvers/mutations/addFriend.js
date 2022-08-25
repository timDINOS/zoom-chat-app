
const addFriend = async function(_, {user, username}, {conn}) {
    await conn.Profile.findOneAndUpdate({username: user}, {
        $inc: {
            count: 1
        }
    });
    await conn.Profile.findOneAndUpdate({username: username}, {
        $inc: {
            count: 1
        }
    });
    var entry = await conn.Friends.find_one({username: user});
    if (!entry) {
        newEntry = {
            username: username,
            friends: []
        }
        await conn.Friends.create(newEntry);
    }
    await conn.Friends.findOneAndUpdate({username: username}, {
        $push: {
            username: user,
            date: new Date()
        }
    });

    await conn.Friends.findOneAndUpdate({username: user}, {
        $push: {
            username: username,
            date: new Date()
        }
    });

    return {usename: username};
}