
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book] 
  }

  type Book {
      _id: ID
      authors: [String]
      description: String
      image: String
      title: String
      link: String

  }

  input BookInput {
      authors: [String]
      description: String
      image: String
      title: String
      link: String
      bookId: String

  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User  
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(bookText: String!, bookAuthor: String!): User
    removeBook(BookIdId: ID!): User
  }
`;

module.exports = typeDefs;
