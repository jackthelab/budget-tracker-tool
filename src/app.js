// require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

// resolver files
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');

const resolvers = { 
  Query,

  Mutation: {
    createUser: (parent, args) => {
      const user = {
        id: Math.floor(Math.random() * 33353235323435),
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email
      }
      console.log(`${ user.email } account created`)
      return user
    },
    
  },

  User: {
    id: (parent) => parent.id,
    firstName: (parent) => parent.firstName,
    lastName: (parent) => parent.lastName,
    email: (parent) => parent.email
  }

}

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  resolvers,
  context: {
    prisma
  }
})

server
  .listen()
  .then(( { url }) => console.log(`server is running on ${ url }`))
