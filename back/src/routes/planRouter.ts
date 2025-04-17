import express from "express";
import { isAdmin, isLoggedin } from "../middlewares/passport";
import {
  createPlan,
  deletePlan,
  getAllPlan,
  getPlanById,
  updatePlan,
} from "../controllers/plan.controller";

const router = express.Router();

// 일정 삭제
router.post("/delete", isLoggedin, deletePlan);

// 일정수정
router.post("/update", isLoggedin, updatePlan);

// 일정생성
router.post("/create", isLoggedin, createPlan);

// 일정상세
router.post("/:id", isLoggedin, getPlanById);

// 일정리스트
router.post("/", isLoggedin, getAllPlan);

export default router;
