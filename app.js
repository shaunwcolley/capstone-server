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

const testWebsites = [{ id: 25, url: 'https://www.digitalcrafts.com' }];

const rule = new schedule.RecurrenceRule();
rule.second = 1;

let count = 0;
// const job = schedule.scheduleJob(rule, async () => {
//   await processWebsites(testWebsites).catch(error => console.log(error))
//   count += 1;
//   console.log(`minute ${count}`);
// });

// job.schedule(new Date(Date.now() + 5000));

processWebsites(testWebsites)

const PORT = process.env.PORT || 8080;

server.listen(PORT).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
