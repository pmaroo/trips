import express from "express";
import {
  adminLoginUser,
  createUser,
  exitUser,
  getAllUsers,
  getUserById,
  loginUser,
  logoutUser,
  updateUser,
} from "../controllers/user.controller";

const router = express.Router();

// 로그아웃
router.post("/logout", logoutUser);

// 관리자 로그인
router.post("/adminLogin", adminLoginUser);

// 로그인
router.post("/login", loginUser);

// 회원탈퇴
router.post("/exit", exitUser);

// 회원수정
router.post("/update", updateUser);

// 회원가입
router.post("/create", createUser);

// 전체회원조회
router.post("/all", getAllUsers);

// 회원조회
router.get("/:id", getUserById);

export default router;
