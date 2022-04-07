import { typeDefs, resolvers } from '../schemas';
import { ApolloServer } from 'apollo-server-express';
import authMiddleware from '../auth';

const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
});

export default apollo;
