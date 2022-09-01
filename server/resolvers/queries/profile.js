const getProfile = async function(_, {}, {model}) {
    return await model.Profile.find();
}

module.exports = getProfile;