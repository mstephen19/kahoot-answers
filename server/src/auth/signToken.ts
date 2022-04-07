import jwt from 'jsonwebtoken';

interface TokenSignParams {
    'user-agent': string;
    'sec-ch-ua': string;
}

export interface TokenPayload {
    userAgent: string;
    secChUa: string;
}

const signToken = (params: Partial<TokenSignParams>) => {
    const data: TokenPayload = { userAgent: params['user-agent'], secChUa: params['sec-ch-ua'] };
    return jwt.sign({ data }, process.env.AUTH_SECRET, { expiresIn: process.env.AUTH_EXPIRATION });
};

export default signToken;
