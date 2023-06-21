
const addFriend = async function(_, {user, username, email}, {conn}) {
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
    await conn.Friends.findOneAndUpdate({username: username, email: email}, {
        $push: {
            username: username,
            date: new Date(),
            email: email
        }
    });

    return {usename: username};
}