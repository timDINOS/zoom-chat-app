const addProfile = async function(_, {input}, {model}) {
    newProfile = await model.Profile.create(input);

    return newProfile;
};


module.exports = addProfile;