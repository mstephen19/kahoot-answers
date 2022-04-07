import { createRequest, getAnswers } from '../lib/kahoot';

const resolvers = {
    Query: {
        answers: async (_: any, { url }: { url: string }) => {
            try {
                const request = createRequest(url);

                const answers = await getAnswers(request);

                return answers;
            } catch (error) {
                return [];
            }
        },
    },
};

export default resolvers;
