import express from "express";
import { isAdmin, isLoggedin } from "../middlewares/passport";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
} from "../controllers/category.controller";

const router = express.Router();

// 카테고리삭제
router.post("/delete", isAdmin, deleteCategory);

// 카테고리수정
router.post("/update", isAdmin, updateCategory);

// 카테고리생성
router.post("/create", isAdmin, createCategory);

// 카테고리리스트
router.post("/", isLoggedin, getAllCategory);

export default router;
