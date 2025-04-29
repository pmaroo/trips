import express from "express";
import {
  authenticateToken,
  optionalAuthenticateToken,
} from "../middlewares/jwtVerify";

const router = express.Router();

// 선택적 JWT검증
router.post("/verify/optional", optionalAuthenticateToken);

// 무조건적 JWT검증
router.post("/verify", authenticateToken);

export default router;
