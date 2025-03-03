import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 250,
    message: 'too many requests from this IP, please try again later.',
});