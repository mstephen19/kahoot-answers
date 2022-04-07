import '../styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import GlobalThemeProvider from '../components/theme/GlobalThemeProvider';

import client from '../apollo/client';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={client}>
            <GlobalThemeProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </GlobalThemeProvider>
        </ApolloProvider>
    );
}

export default MyApp;
