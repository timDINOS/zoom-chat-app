const createMeeting = async function(_, {user, email, input}, {conn}) {
    var res = await conn.Users.find_one({username: user});
    if (!res) {
        const entry = {
            name: user,
            email: email,
            meetings: []
        }
        await conn.Meetings.create(entry);
    }

    await conn.Meetings.findOneAndUpdate({username: user},
    {
        $push: {
            "meetings": input
        }
    });

    return input;
}