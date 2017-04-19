
var express = require('express');
var {
  graphqlExpress,
  graphiqlExpress,
} = require('graphql-server-express');
var bodyParser = require('body-parser');

var { schema } = require('./src/schema');
var cors = require('cors');

const PORT = 4000;
const server = express();
server.use('*', cors({ origin: 'http://localhost:8080' }));

server.use('/graphql', bodyParser.json(), graphqlExpress({
  schema
}));

server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));

server.listen(PORT, () => 
  console.log(`GraphQL Server is now running on http://localhost:${PORT}`)
);
