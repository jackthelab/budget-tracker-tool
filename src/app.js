require('dotenv').config();

const { ApolloServer } = require('apollo-server');

const typeDefs = `
  type Query {
    info: String!
  }
`
const resolvers = { 
  Query: {
    info: () => `This is a budget tool API`
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true
})

server
  .listen()
  .then(( { url }) => console.log(`server is running on ${ url }`))

// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// const express = require('express');
// const app = express();

// const cors = require('cors');
// app.use(cors());

// const port = process.env.PORT || 3000;

// app.listen(port, () => {
//   console.log(`Listening on port ${ port }`);
// })