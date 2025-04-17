import express from "express";
import { isAdmin, isLoggedin } from "../middlewares/passport";
import {
  createPlace,
  deletePlace,
  getAllPlace,
  updatePlace,
} from "../controllers/plcae.controller";

const router = express.Router();

// 장소 삭제
router.post("/delete", isLoggedin, deletePlace);

// 장소수정
router.post("/update", isLoggedin, updatePlace);

// 장소생성
router.post("/create", isLoggedin, createPlace);

// 장소리스트
router.post("/", isAdmin, getAllPlace);

export default router;
