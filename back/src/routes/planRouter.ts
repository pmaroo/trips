import express from "express";
import {
  createPlan,
  deletePlan,
  getAllPlan,
  getPlanById,
  updatePlan,
} from "../controllers/plan.controller";

const router = express.Router();

// 일정 삭제
router.post("/delete", deletePlan);

// 일정수정
router.post("/update", updatePlan);

// 일정생성
router.post("/create", createPlan);

// 일정상세
router.post("/:id", getPlanById);

// 일정리스트
router.post("/", getAllPlan);

export default router;
