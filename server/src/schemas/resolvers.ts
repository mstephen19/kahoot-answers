import { createRequest, getAnswers } from '../lib/kahoot';
import { AuthenticationError } from 'apollo-server-express';
import { signToken } from '../auth';
import { TokenPayload } from '../auth/signToken';

const resolvers = {
    Query: {
        answers: async (_: any, { url }: { url: string }, { auth }: Partial<{auth: TokenPayload}>) => {
            if (!auth) return new AuthenticationError('No token')

            try {
                const request = createRequest(url);

                const answers = await getAnswers(request);

                return answers;
            } catch (error) {
                return [];
            }
        },
        token: async (_: any, __: any, { headers, auth }: Partial<{auth: TokenPayload, headers: any}>) => {
            if (auth) return new Error('You already have a token!');

            if (!headers || !headers?.['user-agent'] || !headers?.['User-Agent']) {
                return new AuthenticationError('Failed to authenticate.');
            }

            const token = signToken(headers);

            return { token };
        },
    },
};

export default resolvers;
