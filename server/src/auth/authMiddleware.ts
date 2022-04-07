// @ts-nocheck
import jwt from 'jsonwebtoken';

import type { TokenPayload } from './signToken';

const authMiddleware = ({ req }: any) => {
    let token: string = req.headers?.authorization;

    if (token) token = token?.split(' ').pop().trim();

    try {
        const { data } = jwt.verify(token, process.env.AUTH_SECRET, { maxAge: process.env.AUTH_EXPIRATION }) as Record<'data', TokenPayload>;
        req.auth = data;
    } catch {
        console.error('Invalid token');
    }

    req.head = req.headers;

    return req;
};

export default authMiddleware;
