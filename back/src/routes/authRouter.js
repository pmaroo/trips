"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwtVerify_1 = require("../middlewares/jwtVerify");
const jwt_controller_1 = require("../controllers/jwt.controller");
const snsLogin_1 = require("../middlewares/snsLogin");
const router = express_1.default.Router();
// 선택적회원 JWT검증
router.post("/verify/optional", jwtVerify_1.optionalAuthenticateToken, jwt_controller_1.successToken);
// 무조건적관리자회원 JWT검증
router.post("/verify", jwtVerify_1.authenticateToken, jwt_controller_1.successToken);
// 카카오로그인
router.post("/kakao", jwt_controller_1.kakaoToken);
// 네이버로그인
router.post("/naver", snsLogin_1.naverToken, jwt_controller_1.naverLogin);
// 구글로그인
router.post("/google", jwt_controller_1.googleLogin);
exports.default = router;
