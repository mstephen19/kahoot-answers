import { Type } from './types';

export const BASE_URL = 'https://play.kahoot.it/rest';

export const CHALLENGE_URI = (id: string) => `${BASE_URL}/challenges/${id}/answers`;

export const QUIZ_URI = (id: string) => `${BASE_URL}/kahoots/${id}`;

export const types: Record<Type, Type> = {
    CHALLENGE: 'CHALLENGE',
    QUIZ: 'QUIZ',
};
