const { ApolloServer } = require('apollo-server');
const cors = require('cors');
const schedule = require('node-schedule');

const opts = require('./utils/opts');
const launchChromeAndRunLighthouse = require('./utils/lighthouseFetch');
const db = require('./models');
const typeDefs = require('./data/schema');
const resolvers = require('./data/resolvers');
const desktopConfig = require('./utils/lr-desktop-config');
const mobileConfig = require('./utils/lr-mobile-config');



const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { db },
  introspection: true,
  playground: true,
});

async function processWebsites(array) {
 for(const item of array) {
   const { id, url } = item;
    await launchChromeAndRunLighthouse(url, opts, desktopConfig, id);
    await launchChromeAndRunLighthouse(url, opts, mobileConfig, id);
 }
}

// db.Website.findAll()
//   .then((websites) => {
//     processWebsites(websites);
//   });

const testWebsites = [{ id: 1, url: 'https://www.google.com' }];

const job = schedule.scheduleJob({ hour: 15, minute: 30, dayOfWeek: 0 }, async () => {
  await processWebsites(testWebsites).catch(error => console.log(error));
  console.log('process fired.');
});

job.schedule();

// processWebsites(testWebsites);

const PORT = process.env.PORT || 8080;

server.listen(PORT).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
