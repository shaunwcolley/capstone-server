const { graphql } = require('graphql');
const schema = require('../data/schema');

// websiteFetch will return a promise.
const websiteFetch = string => graphql(schema, string);

module.exports = websiteFetch;
