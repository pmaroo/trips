import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
} from "../controllers/category.controller";

const router = express.Router();

// 카테고리삭제
router.post("/delete", deleteCategory);

// 카테고리수정
router.post("/update", updateCategory);

// 카테고리생성
router.post("/create", createCategory);

// 카테고리리스트
router.post("/", getAllCategory);

export default router;
