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
import { adminAuthenticateToken } from "../middlewares/jwtVerify";

const router = express.Router();

// 관리자 로그인
router.post("/adminLogin", adminLoginUser);

// 로그인
router.post("/login", loginUser);

// 회원탈퇴
router.post("/exit", adminAuthenticateToken, exitUser);

// 회원수정
router.post("/update", adminAuthenticateToken, updateUser);

// 회원가입
router.post("/create", createUser);

// 전체회원조회
router.post("/all", adminAuthenticateToken, getAllUsers);

// 회원조회
router.post("/:id", adminAuthenticateToken, getUserById);

export default router;
