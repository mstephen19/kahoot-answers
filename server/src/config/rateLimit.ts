import rateLimiter from 'express-rate-limit';

const rateLimit = rateLimiter({
    statusCode: 429,
    max: 100,
    windowMs: 5 * 60 * 1000,
    standardHeaders: true,
    legacyHeaders: false,
    skipFailedRequests: true,
    message: 'HTTP 429: Too many requests'
});

export default rateLimit;
