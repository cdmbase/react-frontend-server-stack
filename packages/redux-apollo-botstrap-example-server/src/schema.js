var {
  makeExecutableSchema,
  //addMockFunctionsToSchema,
} = require('graphql-tools');

var { resolvers } = require('./resolvers');

const typeDefs = `
type User {
  usersCount: ID!
}

type Query {
  users: User    # "[]" means this is a list of channels
}
`;

var schema = makeExecutableSchema({ typeDefs, resolvers });
module.exports = { schema };
