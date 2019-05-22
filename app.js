const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typeDefs.js');
const resolvers = require('./resolvers.js');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const PORT = process.env.PORT || 8080;

server.listen(PORT).then(({ url }) => {
  console.log(`Server is ready at ${url}`);
});
