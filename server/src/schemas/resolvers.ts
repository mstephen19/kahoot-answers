import { createRequest, getAnswers } from '../lib/kahoot';
import { AuthenticationError } from 'apollo-server-express';
import { signToken } from '../auth';
import { TokenPayload } from '../auth/signToken';

import { Thready } from 'node-thready';
import path from 'path';

Thready.init({
    dir: __dirname,
});

const resolvers = {
    Query: {
        answers: async (_: any, { url }: { url: string }, { auth }: Partial<{ auth: TokenPayload }>) => {
            if (!auth) return new AuthenticationError('No token');

            try {
                const request = createRequest(url);

                const answers = await Thready.go({
                    script: getAnswers,
                    args: [request],
                    imports: [
                        {
                            name: 'axios_1',
                            from: 'axios',
                        },
                    ],
                });

                return answers;
            } catch (error) {
                return new Error(`Failed to grab answers!`);
            }
        },
        token: async (_: any, __: any, { ip, auth }: { auth: TokenPayload; ip: string }) => {
            if (auth) return new Error('You already have a token!');

            try {
                const token = signToken({ ip });
                return { token };
            } catch (err) {
                const e = err as Error;
                return new Error(`Failed to authenticate: ${e.message}`);
            }
        },
    },
};

export default resolvers;
