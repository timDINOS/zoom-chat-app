const {gql} = require("apollo-server");

module.exports = gql`
    type Friend {
        name: String!,
        date: Date!
    }

    type Friends{
        name: String!,
        friends: [Friend!]!
    }

    type Query{
        friends: [Friends]
    }

    type addNewFriend{
        username: String!
    }

    type removeFriend{
        username: String!
    }

    type Mutation{
        addFriend(user: String, username: String): addNewFriend!,
        removeFriend(user: String, username: String): removeFriend!
    }
`