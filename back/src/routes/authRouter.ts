import express from "express";
import {
  adminAuthenticateToken,
  adminOptionalAuthenticateToken,
  authenticateToken,
  optionalAuthenticateToken,
} from "../middlewares/jwtVerify";
import { kakaoToken, successToken } from "../controllers/jwt.controller";

const router = express.Router();

// 선택적회원 JWT검증
router.post("/verify/optional", optionalAuthenticateToken, successToken);

// 무조건적관리자회원 JWT검증
router.post("/verify", adminAuthenticateToken, successToken);

// 카카오로그인
router.post("/kakao", kakaoToken);

export default router;
