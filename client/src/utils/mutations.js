import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($bookData: String) {
    addBook(bookData: $bookData) {
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            authors
            title
            description
            link
            image
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation REMOVE_BOOK($bookId: ID!) {
    removeBook(bookId: $bookId) {
        _id
        username
        savedBooks {
            bookId
            authors
            title
            description
            link
            image
        }
    }
  }
`;
