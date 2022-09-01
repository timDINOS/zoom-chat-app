const {gql} = require('apollo-server');

module.exports = gql`
    type Profile {
        name: String!,
        number_of_friends_count: Number!,
        total_time_on_zoom: Number!,
        number_of_meetings_created: Number!,
        number_of_meetings_joined: Number!,
        joined_date: Date!
    }

    type Query {
        profiles: Profile
    }

    input newProfile {
        name: String!,
        number_of_friends_count: Number!,
        total_time_on_zoom: Number!,
        number_of_meetings_created: Number!,
        number_of_meetings_joined: Number!,
        joined_date: Date!
    }

    type Mutation {
        addProfile(input: newProfile): Profile!,
        deleteProfile(user: String): String!,
        getProfile(user: String): Profile!
    }
`