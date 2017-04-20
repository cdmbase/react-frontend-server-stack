var users = {
  usersCount: 11
};

var repos = {
  reposCount: 6
};

//var nextId = 3;

var resolvers = {
  Query: {
    users: () => { return users; },
    repos: () => { return repos; },
  }
};

module.exports = { resolvers };
