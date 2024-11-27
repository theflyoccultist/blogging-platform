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
const Users_1 = require("../../models/Users");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const RefreshToken_1 = __importDefault(require("../../models/RefreshToken"));
dotenv_1.default.config();
const router = express_1.default.Router();
const isDevelopment = process.env.NODE_ENV === "development";
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ error: 'Username and password are required' });
            return;
        }
        const user = yield Users_1.Users.findOne({ where: { username } });
        if (!user) {
            res.status(401).json({ error: 'User not found' });
            return;
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            res.status(401).json({ error: 'Invalid password' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '15m',
        });
        const refreshToken = (0, uuid_1.v4)();
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7); // Valid for 7 days
        yield RefreshToken_1.default.create({
            token: refreshToken,
            userId: user.id,
            expiresAt,
        });
        res.cookie('refreshtoken', refreshToken, {
            httpOnly: true,
            secure: !isDevelopment,
            sameSite: isDevelopment ? "strict" : "none",
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({ token });
    }
    catch (error) {
        console.error('Error in /login endpoint:', error);
        res.status(500).json({ error: 'Login failed' });
        return;
    }
}));
exports.default = router;
