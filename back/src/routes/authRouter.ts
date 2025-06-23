import express from "express";
import {
  adminAuthenticateToken,
  adminOptionalAuthenticateToken,
  authenticateToken,
  optionalAuthenticateToken,
} from "../middlewares/jwtVerify";
import {
  googleLogin,
  kakaoToken,
  naverLogin,
  successToken,
} from "../controllers/jwt.controller";
import { naverToken } from "../middlewares/snsLogin";

const router = express.Router();

// 선택적회원 JWT검증
router.post("/verify/optional", optionalAuthenticateToken, successToken);

// 무조건적관리자회원 JWT검증
router.post("/verify", authenticateToken, successToken);

// 카카오로그인
router.post("/kakao", kakaoToken);

// 네이버로그인
router.post("/naver", naverToken, naverLogin);

// 구글로그인
router.post("/google", googleLogin);

export default router;
