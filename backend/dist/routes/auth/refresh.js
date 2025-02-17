"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const RefreshToken_1 = __importDefault(require("../../models/RefreshToken"));
const router = express_1.default.Router();
const isDevelopment = process.env.NODE_ENV === "development";
router.post('/refresh', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshToken = req.cookies.refreshtoken;
        if (!refreshToken) {
            console.error("No refresh token in cookies");
            res.status(401).json({ error: 'No refresh token provided' });
            return;
        }
        const tokenRecord = yield RefreshToken_1.default.findOne({ where: { token: refreshToken } });
        if (!tokenRecord) {
            console.error("Invalid refresh token");
            res.status(401).json({ error: 'Invalid refresh token' });
            return;
        }
        if (new Date() > tokenRecord.expiresAt) {
            console.error("Refresh token expired");
            yield tokenRecord.destroy();
            res.status(401).json({ error: 'Refresh token expired' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: tokenRecord.userId }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });
        const newRefreshToken = (0, uuid_1.v4)();
        const newExpiresAt = new Date();
        newExpiresAt.setDate(newExpiresAt.getDate() + 7); // Valid for 7 days
        yield tokenRecord.update({ token: newRefreshToken, expiresAt: newExpiresAt });
        res.cookie('refreshtoken', newRefreshToken, {
            httpOnly: true,
            secure: !isDevelopment,
            sameSite: isDevelopment ? "strict" : "none",
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        res.status(200).json({ token });
    }
    catch (error) {
        console.error('Error in /refresh endpoint:', error);
        res.status(500).json({ error: 'Error refreshing token' });
    }
}));
exports.default = router;
