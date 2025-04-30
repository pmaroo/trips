import express from "express";
import {
  adminAuthenticateToken,
  adminOptionalAuthenticateToken,
  authenticateToken,
  optionalAuthenticateToken,
} from "../middlewares/jwtVerify";
import { successToken } from "../controllers/jwt.controller";

const router = express.Router();

// 선택적 JWT검증
router.post("/verify/optional", optionalAuthenticateToken, successToken);

// 무조건적 JWT검증
router.get("/verify", adminAuthenticateToken, successToken);

export default router;
