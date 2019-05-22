const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    userName: String
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
    user: User
  }
`;

module.exports = typeDefs;
