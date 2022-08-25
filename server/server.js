const { ApolloServer } = require('apollo-server');
const types = require('./types');
const connectToDB = require('./database/db');
const resolvers = require('./resolvers');
const models = require('./database/models');

connectToDB();

const server = new ApolloServer({
    types,
    resolvers,
    context: {models}
})

server.listen({port: process.env.PORT, }).then(({url}) => {
    console.log(`Ready at ${url}`);
});

module.exports = server;