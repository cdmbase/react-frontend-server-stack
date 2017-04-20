var users = {
  usersCount: 11
};

var repos = {
  reposCount: 6
};

//var nextId = 3;

var resolvers = {
  Query: {
    users: () => { 
      return users; 
    },
    repos: () => { 
      return repos; 
    },
  },
  Mutation: {
    addUser: (root, args) => {
      users.usersCount++;
      return users;
    },
    addRepo: (root, args) => {
      repos.reposCount++;
      return repos;
    },
  },
};

module.exports = { resolvers };
