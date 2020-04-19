import gql from 'graphql-tag';

const typeDefs = gql`
  type Book {
    id: String!
    title: String!
  }

  type Query {
    allBooks: [Book!]!
  }
`;

export {typeDefs as default};
