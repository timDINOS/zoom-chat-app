const {gql} = require("apollo-server");

module.exports = gql`
    type Users{
        name: String!,
        age: Number!,
        email: String!,
        username: String!,
        password: String!
    }

    type Query{
        users: [Users]
    }

    input CreateNewUser{
        name: String!
        age: Number!,
        email: String!,
        username: String!,
        password: String!
    }

    input UpdateUserData{
        name: String,
        age: Number,
        email: String,
        username: String,
        password: String
    }

    type DeleteUser{
        username: String!
    }

    type Mutation{
        createUser(input: CreateNewUser): Users!,
        updateUser(username: String, input: UpdateUserData): Users!,
        deleteUser(username: String): DeleteUser!
    }
`