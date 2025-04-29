import express from "express";
import {
  adminLoginUser,
  createUser,
  exitUser,
  getAllUsers,
  getUserById,
  loginUser,
  updateUser,
} from "../controllers/user.controller";
import { isAdmin, isLoggedin } from "../middlewares/passport";
import {
  authenticateToken,
  optionalAuthenticateToken,
} from "../middlewares/jwtVerify";

const router = express.Router();

// 관리자 로그인
router.post("/adminLogin", optionalAuthenticateToken, adminLoginUser);

// 로그인
router.post("/login", loginUser);

// 회원탈퇴
router.post("/exit", authenticateToken, isLoggedin, exitUser);

// 회원수정
router.post("/update", authenticateToken, isLoggedin, updateUser);

// 회원가입
router.post("/create", createUser);

// 전체회원조회
router.post("/all", authenticateToken, isAdmin, getAllUsers);

// 회원조회
router.post("/:id", authenticateToken, isLoggedin, getUserById);

export default router;
