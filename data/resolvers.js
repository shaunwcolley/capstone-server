const processWebsites = require('../utils/processWebsites');

const resolvers = {
  Query: {
    users: (parent, args, { db }) => db.User.findAll(),
    stats: (parent, args, { db }) => db.Stat.findAll({ include: [{ model: db.Website, as: 'website' }] }),
    websites: (parent, args, { db }) => db.Website.findAll(),
    getWebsite: (parent, { url }, { db }) => db.Website.findOne({ where: { url } }),

  },
  Mutation: {
    createUser: (parent, { username, password }, { db }) => db.User.create({
      username,
      password,
    }),
    createWebsite: (parent, { name, url }, { db }) => db.Website.create({
      name,
      url,
    }),
    createStat: (parent, {
      websiteId,
      performance,
      accessibility,
      bestPractices,
      seo,
      timeFetch,
      timeToFirstByte,
      firstContentfulPaint,
      firstMeaningfulPaint,
      speedIndex,
      timeToInteractive,
      estimatedInputLatency,
    }, { db }) => db.Stat.create({
      website_id: websiteId,
      performance,
      accessibility,
      best_practices: bestPractices,
      seo,
      time_fetch: timeFetch,
      time_to_first_byte: timeToFirstByte,
      first_contentful_paint: firstContentfulPaint,
      first_meaningful_paint: firstMeaningfulPaint,
      speed_index: speedIndex,
      time_to_interactive: timeToInteractive,
      estimated_input_latency: estimatedInputLatency,
    }),
    runLighthouse: (parent, args, { db }) => db.Website.findAll().then((websites) => {
      processWebsites(websites).catch(error => console.log(error));
    }),
  },
};

module.exports = resolvers;
