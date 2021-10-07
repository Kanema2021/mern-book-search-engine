
const { gql } = require('apollo-server-express');

const typeDefs = gql`

type Query {
    me: User
    users: [User]
    user(username: String!): User  
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData: String!, bookAuthor: String!): User
    removeBook(BookIdId: ID!): User
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: String!
    savedBooks: [Book] 
  }

  type Book {
      bookId: ID
      authors: [String]
      description: String!
      title: String!
      image: String!
      link: String!

  }

  input BookInput {
      authors: [String]
      description: String!
      image: String!
      title: String!
      link: String!
      bookId: String!
  }

  type Auth {
    token: ID
    user: User
  }
`;

module.exports = typeDefs;
