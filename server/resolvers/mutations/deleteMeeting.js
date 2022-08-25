const deleteMeeting = async function(_, {user, input}, {conn}) {
    await conn.Meetings.findOneAndUpdate({username: user}, {
        $pull: {
            "meetings": input
        }
    });

    return input.meeting_id;
}