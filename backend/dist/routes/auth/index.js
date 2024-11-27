"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_1 = __importDefault(require("./login"));
const logout_1 = __importDefault(require("./logout"));
const refresh_1 = __importDefault(require("./refresh"));
const register_1 = __importDefault(require("./register"));
const router = express_1.default.Router();
router.post('/login', login_1.default);
router.post('/logout', logout_1.default);
router.post('/refresh', refresh_1.default);
router.post('/register', register_1.default);
exports.default = router;
