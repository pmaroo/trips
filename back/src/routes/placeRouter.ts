import express from "express";
import {
  createPlace,
  createTagPlus,
  deletePlace,
  getAllPlace,
  updatePlace,
} from "../controllers/plcae.controller";

const router = express.Router();

// 장소 태그 추가
router.post("/tag", createTagPlus);

// 장소 삭제
router.post("/delete", deletePlace);

// 장소수정
router.post("/update", updatePlace);

// 장소생성
router.post("/create", createPlace);

// 장소리스트
router.post("/", getAllPlace);

export default router;
