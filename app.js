const { ApolloServer } = require('apollo-server');
const typeDefs = require('./data/schema.js');
const resolvers = require('./data/resolvers.js');
const db = require('./models');
const opts = require('./utils/opts')
const launchChromeAndRunLighthouse = require('./utils/lighthouseFetch')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { db },
});
launchChromeAndRunLighthouse("https://www.google.com", opts)
const PORT = process.env.PORT || 8080;

server.listen(PORT).then(({ url }) => {
  console.log(`Server is ready at ${url}`);
});

 /* # Write your query or mutation here
mutation CreateStat($websiteId: Int,
      $performance: Float,
      $accessibility: Float,
      $bestPractices: Float,
      $seo: Float,
      $timeFetch: String,
      $timeToFirstByte: String,
      $firstContentfulPaint: String,
      $firstMeaningfulPaint: String,
      $speedIndex: String,
      $timeToInteractive: String,
      $estimatedInputLatency: String) {
  createStat(
    websiteId: $websiteId,
    performance: $performance,
    accessibility: $accessibility,
    bestPractices: $bestPractices,
    seo: $seo,
    timeFetch: $timeFetch,
  	timeToFirstByte: $timeToFirstByte,
  	firstContentfulPaint: $firstContentfulPaint,
    firstMeaningfulPaint: $firstMeaningfulPaint,
  	speedIndex: $speedIndex,
  	timeToInteractive: $timeToInteractive,
    estimatedInputLatency: $estimatedInputLatency,
  ) {
      websiteId
      performance
      accessibility
      bestPractices
      seo
      timeFetch
      timeToFirstByte
      firstContentfulPaint
      firstMeaningfulPaint
      speedIndex
      timeToInteractive
      estimatedInputLatency
  }
} */
