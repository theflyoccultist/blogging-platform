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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = express_1.default.Router();
const saltRounds = 12;
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
        const existingUser = yield Users_1.Users.findOne({ where: { username } });
        if (existingUser) {
            res.status(409).json({ message: 'Username already exists.' });
            return;
        }
        const user = yield Users_1.Users.create({ username, password: hashedPassword });
        yield user.save();
        res.status(201).json({ message: 'User created successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Registration failed ' });
    }
}));
exports.default = router;
