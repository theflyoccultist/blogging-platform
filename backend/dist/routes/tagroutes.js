"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TagsController_1 = require("../controllers/TagsController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get('/', TagsController_1.getAllTags);
router.post('/', authMiddleware_1.verifyToken, TagsController_1.createTag);
router.put('/:id', authMiddleware_1.verifyToken, TagsController_1.updateTag);
router.delete('/:id', authMiddleware_1.verifyToken, TagsController_1.deleteTag);
exports.default = router;
