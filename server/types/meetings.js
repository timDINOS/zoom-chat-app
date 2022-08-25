const {gql} = require('apollo-server');

module.exports = gql`
    type meetings {
        topic: String!,
        meeting_url: String!,
        meeting_id: String!,
        created: Date!,
        recorded: Boolean
    }
    type Meetings {
        username: String!,
        email: String!,
        meetings: [meetings!]!
    }
    type Query {
        meetings: [Meetings]
    }

    input newMeeting {
        topic: String!,
        meeting_url: String!,
        meeting_id: String!,
        created: Date!,
        recorded: Boolean
    }

    type Mutation {
        createMeeting(user: String, email: String, input: newMeeting): meetings!
        deleteMeeting(id: String): String
    }
`