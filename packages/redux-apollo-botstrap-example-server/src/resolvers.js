var users = {
  usersCount: 11
};

var nextId = 3;

var resolvers = {
  Query: {
    users: () => { return users; }
  }
};

module.exports.resolvers = resolvers;
