"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tag_controller_1 = require("../controllers/tag.controller");
const router = express_1.default.Router();
// 태그삭제
router.post("/delete", tag_controller_1.deleteTag);
// 태그수정
router.post("/update", tag_controller_1.updateTag);
// 태그생성
router.post("/create", tag_controller_1.createTag);
// 태그리스트
router.post("/", tag_controller_1.getAllTag);
exports.default = router;
