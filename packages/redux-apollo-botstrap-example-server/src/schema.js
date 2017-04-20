var {
  makeExecutableSchema,
  //addMockFunctionsToSchema,
} = require('graphql-tools');

var { resolvers } = require('./resolvers');

const typeDefs = `
type Users {
  usersCount: ID!
}

type Repos {
  reposCount: ID!
}

type Query {
  users: Users    # "[]" means this is a list of channels
  repos: Repos
}

type Mutation {
  addUser(name: String): Users
  addRepo(name: String): Repos
}
`;

var schema = makeExecutableSchema({ typeDefs, resolvers });
module.exports = { schema };
