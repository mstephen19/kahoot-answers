// @ts-nocheck
import jwt from 'jsonwebtoken';

interface TokenSignParams {
    ip: string;
}

export interface TokenPayload {
    ip: string;
}

const signToken = ({ ip }: TokenSignParams) => {
    const data: TokenPayload = { ip };
    return jwt.sign({ data }, process.env.AUTH_SECRET, { expiresIn: process.env.AUTH_EXPIRATION });
};

export default signToken;
