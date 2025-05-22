import express from "express";
import { findLogic } from "../controllers/logic.controller";

const router = express.Router();

// 네이버 장소 불러오기
router.post("/find", findLogic);

export default router;
