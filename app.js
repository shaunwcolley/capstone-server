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
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require('./config/keys');

// Passport

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});


passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        done(null, existingUser);
      } else {
        const user = await new User({ googleId: profile.id }).save();
        done(null, user);
      }
    }
  )
);


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

const job = schedule.scheduleJob({ hour: 8, minute: 30, dayOfWeek: 2 }, async () => {
  db.Website.findAll()
    .then((websites) => {
      processWebsites(websites).catch(error => console.log(error));
    });
  console.log('LH process was fired, logging websites to db.');
});

job.schedule();


const PORT = process.env.PORT || 8080;

server.listen(PORT).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
