import express from 'express';
import next from 'next';

import compression from 'compression';
import logger from 'morgan';

import apollo from './config/apollo';

const PORT = process.env.PORT || 8080;
const dev = process.env.NODE_ENV !== 'production';

const nxt = next({ dev });
const handle = nxt.getRequestHandler();

nxt.prepare().then(() => {
    const app = express();

    (async () => {
        await apollo.start();
        apollo.applyMiddleware({ app });
    })();

    app.use(logger('dev'));
    app.use(compression());

    app.get('*', (req, res) => {
        return handle(req, res);
    });

    app.listen(PORT, () => {
        console.log(`Listening on ${PORT}`);
        console.log(`GraphQL: ${PORT}${apollo.graphqlPath}`)
    });
});
