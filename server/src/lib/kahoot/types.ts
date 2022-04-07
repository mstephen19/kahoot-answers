export type Type = 'CHALLENGE' | 'QUIZ';

export interface Request {
    uri: string;
    type: 'CHALLENGE' | 'QUIZ';
}
