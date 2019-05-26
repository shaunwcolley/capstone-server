const { ApolloServer } = require('apollo-server-express');
// const cors = require('cors');
const schedule = require('node-schedule');
const express = require('express');

const opts = require('./utils/opts');
const launchChromeAndRunLighthouse = require('./utils/lighthouseFetch');
const db = require('./models');
const typeDefs = require('./data/schema');
const resolvers = require('./data/resolvers');
const desktopConfig = require('./utils/lr-desktop-config');
const mobileConfig = require('./utils/lr-mobile-config');

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { db },
  introspection: true,
  playground: true,
});

server.applyMiddleware({ app });

async function processWebsites(array) {
 for(const item of array) {
   const { id, url } = item;
    await launchChromeAndRunLighthouse(url, opts, desktopConfig, id);
    await launchChromeAndRunLighthouse(url, opts, mobileConfig, id);
 }
}
db.Website.findAll()
  .then((websites) => {
    processWebsites(websites);
  });

const testWebsites = [{ id: 1, url: 'https://www.google.com' }];

const rule = new schedule.RecurrenceRule();
rule.second = 1;

let count = 0;
const job = schedule.scheduleJob(rule, async () => {
  await processWebsites(testWebsites);
  count += 1;
  console.log(`minute ${count}`);
});

job.schedule(new Date(Date.now() + 5000));

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(PORT, () => {
  console.log(`Server is ready at ${PORT}`);
});
