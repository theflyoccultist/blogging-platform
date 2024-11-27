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
const RefreshToken_1 = __importDefault(require("../../models/RefreshToken"));
const router = express_1.default.Router();
const isDevelopment = process.env.NODE_ENV === "development";
router.post('/logout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshToken = req.cookies.refreshtoken;
        if (!refreshToken) {
            res.status(400).json({ error: 'No refresh token provided' });
            return;
        }
        const tokenRecord = yield RefreshToken_1.default.findOne({ where: { token: refreshToken } });
        if (tokenRecord) {
            yield tokenRecord.destroy();
        }
        res.clearCookie('refreshtoken', {
            httpOnly: true,
            secure: !isDevelopment,
            sameSite: isDevelopment ? "strict" : "none",
            path: '/',
        });
        res.status(200).json({ message: 'Logout successful' });
    }
    catch (error) {
        console.error('Error in /logout endpoint:', error);
        res.status(500).json({ error: 'Error during logout' });
    }
}));
exports.default = router;
