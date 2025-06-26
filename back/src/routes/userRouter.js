"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const snsLogin_1 = require("../middlewares/snsLogin");
const router = express_1.default.Router();
// 로그아웃
router.post("/logout", user_controller_1.logoutUser);
// 관리자 로그인
router.post("/adminLogin", user_controller_1.adminLoginUser);
// 로그인
router.post("/login", snsLogin_1.snsLoginMiddleware, user_controller_1.loginUserController);
// 회원탈퇴
router.post("/exit", user_controller_1.exitUser);
// 회원수정
router.post("/update", user_controller_1.updateUser);
// 회원가입
router.post("/create", user_controller_1.createUser);
// 전체회원조회
router.post("/all", user_controller_1.getAllUsers);
// 회원조회
router.get("/:id", user_controller_1.getUserById);
exports.default = router;
