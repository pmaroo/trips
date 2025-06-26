"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("../controllers/category.controller");
const router = express_1.default.Router();
// 카테고리삭제
router.post("/delete", category_controller_1.deleteCategory);
// 카테고리수정
router.post("/update", category_controller_1.updateCategory);
// 카테고리생성
router.post("/create", category_controller_1.createCategory);
// 카테고리리스트
router.post("/", category_controller_1.getAllCategory);
exports.default = router;
