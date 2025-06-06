import express from "express";
import { findLogic } from "../controllers/logic.controller";
import { getPlanById } from "../controllers/plan.controller";

const router = express.Router();

// 일정 저장하기
router.post("/find", findLogic);

export default router;
