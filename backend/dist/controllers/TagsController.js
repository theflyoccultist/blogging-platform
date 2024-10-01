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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTag = exports.updateTag = exports.createTag = exports.getAllTags = void 0;
const Tags_1 = require("../models/Tags");
const getAllTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allTags = yield Tags_1.Tags.findAll();
        res.status(200).json(allTags);
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to retrieve tags' });
        console.error(error);
    }
});
exports.getAllTags = getAllTags;
const createTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const tag = yield Tags_1.Tags.create({ name });
        res.status(201).json(tag);
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to create tag' });
        console.error(error);
    }
});
exports.createTag = createTag;
const updateTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tag = yield Tags_1.Tags.update(req.body, {
            where: { id: req.params.id },
        });
        if (!tag) {
            res.status(404).json({ message: 'Tag not found' });
            return;
        }
        res.status(200).json({ message: 'Tag Edited' });
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to update tag' });
        console.error(error);
    }
});
exports.updateTag = updateTag;
const deleteTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield Tags_1.Tags.destroy({
            where: { id: req.params.id },
        });
        if (result === 0) {
            res.status(404).json({ message: 'Tag not found' });
            return;
        }
        res.status(204).json({ message: "Tag deleted" });
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to delete tag' });
        console.error(error);
    }
});
exports.deleteTag = deleteTag;
