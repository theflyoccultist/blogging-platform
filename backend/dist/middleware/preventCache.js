"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preventCache = void 0;
const preventCache = (req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
};
exports.preventCache = preventCache;
