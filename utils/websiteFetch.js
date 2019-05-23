const { graphql } = require('graphql');
const schema = require('../data/schema');
const db = require('../models')

// websiteFetch will return a promise.
const websiteFetch = string => graphql(schema, string, db);

module.exports = websiteFetch;
