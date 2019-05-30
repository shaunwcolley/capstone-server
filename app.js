// Imports from node modules
const { ApolloServer } = require('apollo-server');
const cors = require('cors');
const schedule = require('node-schedule');
require('dotenv').config();

// util(s) to get Lighthouse to run.
const processWebsites = require('./utils/lighthouse/processWebsites');

// database models from sequelize
const db = require('./models');

// schema and resolvers for apollo server
const typeDefs = require('./data/schema');
const resolvers = require('./data/resolvers');

// Authenticate function
const authenticate = require('./utils/auth/authenticate');

// // Uncomment following code to create users in DB
// const seedUsers = require('./utils/auth/seedRegister');
// seedUsers();


// Server defined passing in schema, resovlers, db models,
// and introspection/playground (only for dev, remove later)
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    return { db, user: authenticate(token) };
  },
  introspection: true,
  playground: true,
});


const job = schedule.scheduleJob({ hour: 2, minute: 30, dayOfWeek: 4 }, async () => {
  db.Website.findAll()
    .then((websites) => {
      processWebsites(websites).catch(error => console.log(error));
    });
  console.log('LH process was fired, logging websites to db.');
});

job.schedule();

// const testWebsites = [{ id: 7, url: 'https://www.hellomonday.com' }];
// processWebsites(testWebsites).catch(error => console.log(error));

const PORT = process.env.PORT || 8080;

server.listen(PORT).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
