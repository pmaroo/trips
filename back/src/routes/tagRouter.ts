import express from "express";
import {
  createTag,
  deleteTag,
  getAllTag,
  updateTag,
} from "../controllers/tag.controller";

const router = express.Router();

// 태그삭제
router.post("/delete", deleteTag);

// 태그수정
router.post("/update", updateTag);

// 태그생성
router.post("/create", createTag);

// 태그리스트
router.post("/", getAllTag);

export default router;
