const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const fs = require('fs');
const path = require('path');
const typeDefs = fs.readFileSync(path.join(__dirname, 'graphql', 'schema.gql'), 'utf8');
const resolvers = require('./graphql/resolvers');
const authenticate = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');
const config = require('./config/config');

async function startServer() {
  const app = express();

  // Middleware for parsing JSON bodies
  app.use(express.json());

  // Protected routes can use the authenticate middleware
  app.use(authenticate);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ user: req.user })
  });

  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  // Global error handler
  app.use(errorHandler);

  app.listen(config.port, () => {
    console.log(`Server is running at http://localhost:${config.port}${server.graphqlPath}`);
  });
}

startServer();
