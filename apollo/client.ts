import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getCookie } from 'cookies-next';

import { TOKEN } from '../auth/constants';

const link = createHttpLink({
    // uri: 'https://kahoot-answers.herokuapp.com/graphql',
    uri: 'http://localhost:8080/graphql',
});

const authLink = setContext((_, { headers }) => {
    const token = getCookie(TOKEN);

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(link),
    cache: new InMemoryCache(),
});

export default client;
