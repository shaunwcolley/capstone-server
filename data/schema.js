const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: Int
    username: String
    password: String
  }

  type Website {
    id: Int
    name: String
    url: String
    groupId: Int
  }

  type Stat {
    id: Int
    websiteId: Int
    performance: Float
    accessibility: Float
    bestPractices: Float
    seo: Float
    timeFetch: String
    timeToFirstByte: String
    firstContentfulPaint: String
    firstMeaningfulPaint: String
    speedIndex: String
    timeToInteractive: String
    estimatedInputLatency: String
  }

  type Query {
    stats: [Stat]
    users: [User]
    getWebsite(url: String): Website
  }

  type Mutation {
    createUser(username: String, password:String): User,
    createStat(
    websiteId: Int
    performance: Float
    accessibility: Float
    bestPractices: Float
    seo: Float
    timeFetch: String
    timeToFirstByte: String
    firstContentfulPaint: String
    firstMeaningfulPaint: String
    speedIndex: String
    timeToInteractive: String
    estimatedInputLatency: String): Stat,
  }
`;

module.exports = typeDefs;
