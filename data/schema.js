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
    website_id: Int
    performance: Float
    accessibility: Float
    best_practices: Float
    seo: Float
    time_fetch: String
    timeToFirstByte: String
    firstContentfulPaint: String
    firstMeaningfulPaint: String
    speedIndex: String
    timeToInteractive: String
    estimatedInputLatency: String
    method: String
    error_code: String
    error_message: String
    website: Website
  }

  type Query {
    stats: [Stat]
    users: [User]
    websites: [Website]
    getWebsite(url: String): Website
  }

  type Mutation {
    createUser(username: String, password:String): User
    createWebsite(name: String, url:String): Website
    createStat(
    website_id: Int
    performance: Float
    accessibility: Float
    best_practices: Float
    seo: Float
    time_fetch: String
    timeToFirstByte: String
    firstContentfulPaint: String
    firstMeaningfulPaint: String
    speedIndex: String
    timeToInteractive: String
    estimatedInputLatency: String): Stat
  }
`;

module.exports = typeDefs;
