import apollo from 'apollo-server';

import typeDefs from './schema.mjs';
import resolvers from './resolvers.mjs';

// https://github.com/apollographql/apollo-server/issues/1356#issuecomment-565273737
const {ApolloServer} = apollo;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen();
