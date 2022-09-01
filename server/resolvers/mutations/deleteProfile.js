const deleteProfile = async function(_, {user}, {model}) {
    const deleted = await model.Profile.deleteOne({name: user});

    if (deleted.deletedCount > 0) {
        const res = {
            name: user
        }
        return res;
    }
}