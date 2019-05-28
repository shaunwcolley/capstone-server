const { ApolloServer } = require('apollo-server');
const cors = require('cors');
const schedule = require('node-schedule');
const opts = require('./utils/opts');
const launchChromeAndRunLighthouse = require('./utils/lighthouseFetch');
const processWebsites = require('./utils/processWebsites')
const db = require('./models');
const typeDefs = require('./data/schema');
const resolvers = require('./data/resolvers');
const desktopConfig = require('./utils/lr-desktop-config');
const mobileConfig = require('./utils/lr-mobile-config');
const baseConfig = require('./utils/baseConfig');


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { db },
  introspection: true,
  playground: true,
});

// const job = schedule.scheduleJob({ hour: 8, minute: 30, dayOfWeek: 2 }, async () => {
//   db.Website.findAll()
//     .then((websites) => {
//       processWebsites(websites).catch(error => console.log(error));
//     });
//   console.log('LH process was fired, logging websites to db.');
// });
//
// job.schedule();

// const testWebsites = [{ id: 1, url: 'https://www.google.com' }];
// processWebsites(testWebsites).catch(error => console.log(error));


const PORT = process.env.PORT || 8080;

server.listen(PORT).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
