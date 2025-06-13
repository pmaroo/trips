import express from "express";
import {
  findLogic,
  findPlace,
  updatePlan,
} from "../controllers/logic.controller";
import { getPlanById } from "../controllers/plan.controller";

const router = express.Router();

// 일정 수정하기
router.post("/update", updatePlan);

// 장소 찾기
router.post("/find/place", findPlace);

// 일정 저장하기
router.post("/find", findLogic);

export default router;
