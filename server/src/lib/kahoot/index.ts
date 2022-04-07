import axios from 'axios';
import { types, CHALLENGE_URI, QUIZ_URI } from './constants';
import { Request, Type } from './types';

export const createRequest = (string: string): Request => {
    let url: URL;

    try {
        url = new URL(string);
    } catch (error) {
        throw new Error('Bad URL.');
    }

    const challengeId = url.searchParams.get('challenge-id') || '';
    const quizId = url.searchParams.get('quiz-id') || '';

    const type = (challengeId && types.CHALLENGE) || (quizId && types.QUIZ);
    if (!type) throw new Error('Unable to determine type.');

    return {
        uri: type === types.CHALLENGE ? CHALLENGE_URI(challengeId) : QUIZ_URI(quizId),
        type,
    };
};

export const getAnswers = async ({ type, uri }: Request) => {
    try {
        const { data } = await axios.get(uri);

        if (type === types.CHALLENGE) {
            const { answers } = data;

            return answers.map(({ question }: any) => {
                const { choices, title } = question;
                return { title, choices };
            });
        }

        if (type === types.QUIZ) {
            const { questions } = data;

            return questions.map(({ choices, question }: any) => {
                return { title: question, choices };
            });
        }
    } catch (error) {
        const e = error as Error;
        throw new Error(`Unexpected error: ${e?.message}`);
    }
};
