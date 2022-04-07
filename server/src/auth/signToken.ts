// @ts-nocheck
import jwt from 'jsonwebtoken';

interface TokenSignParams {
    'user-agent': string;
}

export interface TokenPayload {
    userAgent: string;
}

const signToken = (params: TokenSignParams) => {
    const data: TokenPayload = { userAgent: params['user-agent'] || params['User-Agent'] };
    return jwt.sign({ data }, process.env.AUTH_SECRET, { expiresIn: process.env.AUTH_EXPIRATION });
};

export default signToken;
