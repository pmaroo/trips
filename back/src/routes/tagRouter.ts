import express from "express";
import { isAdmin, isLoggedin } from "../middlewares/passport";
import {
  createTag,
  deleteTag,
  getAllTag,
  updateTag,
} from "../controllers/tag.controller";

const router = express.Router();

// 태그삭제
router.post("/delete", isAdmin, deleteTag);

// 태그수정
router.post("/update", isAdmin, updateTag);

// 태그생성
router.post("/create", isAdmin, createTag);

// 태그리스트
router.post("/", isLoggedin, getAllTag);

export default router;
