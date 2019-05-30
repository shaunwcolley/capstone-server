const processWebsites = require('../utils/lighthouse/processWebsites');
const login = require('../utils/auth/login');

const resolvers = {
  Query: {
    users: (parent, args, { db, user }) => {
      if (!user) return null;
      return db.User.findAll();
    },
    stats: (parent, args, { db, user }) => {
      if (!user) return null;
      return db.Stat.findAll({ include: [{ model: db.Website, as: 'website' }] });
    },
    websites: (parent, args, { db, user }) => {
      if (!user) return null;
      return db.Website.findAll();
    },
    sortWebsite: (parent, args, { db, user }) => {
      if (!user) return null;
      return db.Stat.findAll({ include: [{ model: db.Website, as: 'website' }] });
    },
  },
  Mutation: {
    createUser: (parent, { username, password }, { db, user }) => {
      if (!user) return null;
      return db.User.create({
        username,
        password,
      });
    },
    createWebsite: (parent, { name, url }, { db, user }) => {
      if (!user) return null;
      return db.Website.create({
        name,
        url,
      });
    },
    runLighthouse: (parent, args, { db, user }) => {
      if (!user) return null;
      return db.Website.findAll().then((websites) => {
        processWebsites(websites).catch(error => console.log(error));
      });
    },
    login: (parent, { username, password }, { db }) => db.User.findAll({ where: { username } })
      .then(users => login(users, password)),
  },
};

module.exports = resolvers;
