import express from "express";
import {
  createUser,
  exitUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/user.controller";
import { isAdmin, isLoggedin } from "../middlewares/passport";

const router = express.Router();

// 회원탈퇴
router.post("/exit", isLoggedin, exitUser);

// 회원수정
router.post("/update", isLoggedin, updateUser);

// 회원가입
router.post("/create", createUser);

// 전체회원조회
router.post("/all", isAdmin, getAllUsers);

// 회원조회
router.post("/:id", isLoggedin, getUserById);

export default router;
