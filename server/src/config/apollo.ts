import { typeDefs, resolvers } from '../schemas';
import { ApolloServer } from 'apollo-server-express';

const apollo = new ApolloServer({
    typeDefs,
    resolvers,
});

export default apollo;
