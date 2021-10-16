const express = require('express');
const { ApolloServer } = require("apollo-server-express")
const { authMiddleWare } = require("./utils/auth")
const { typeDefs, resolvers } = require("./schemas")
const path = require('path');
const db = require('./config/connection');



const app = express();
const PORT = process.env.PORT || 3001;
console.log (PORT)


  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleWare,
  })
  
  

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


db.once('open', async () => {
  // await server.start();
  server.applyMiddleware({ app, path: '/' })
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  })
});
