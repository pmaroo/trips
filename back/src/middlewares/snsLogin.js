"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.naverToken = exports.snsLoginMiddleware = void 0;
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const axios_1 = __importDefault(require("axios"));
const snsLoginMiddleware = async (req, res, next) => {
    const loginData = req.body;
    // 이메일체크
    const emailCheck = await (0, user_model_1.emailCheckModel)(loginData.email);
    if (!emailCheck) {
        // 일치하는 회원이 없으면 회원가입처리
        const result = await (0, user_model_1.createUserModel)(loginData);
        if (result) {
            // 회원가입 후 다음으로
            const jwtData = {
                id: result.id,
                email: result.email,
                userName: result.userName,
                nickName: result.nickName,
                isAdmin: result.isAdmin,
            };
            req.jwtUser = jwtData;
            next();
            return;
        }
        const message = "회원가입에 실패했습니다.";
        res.status(200).send(message);
        return;
    }
    // 일치하는 회원이 있다면 형식적인 로그인절차
    const data = await bcrypt_1.default.compare(emailCheck.email, emailCheck.password);
    //   안맞을리 없지만 형식적인 로그인 절차
    if (!data) {
        const message = "이메일 혹은 비밀번호가 일치하지 않습니다.";
        res.status(200).send(message);
        return;
    }
    next();
};
exports.snsLoginMiddleware = snsLoginMiddleware;
// 네이버로그인토큰발급
const naverToken = async (req, res, next) => {
    const { code, state } = req.body;
    try {
        const result = await axios_1.default.get("https://nid.naver.com/oauth2.0/token", {
            params: {
                grant_type: "authorization_code",
                client_id: process.env.NAVER_LOGIN_CLIENT_ID,
                client_secret: process.env.NAVER_LOGIN_CLIENT_SECRET,
                redirect_uri: "http://localhost:3000/naver", // 정확히 네이버에 등록된 것과 동일해야 함
                code,
                state,
            },
        });
        req.naverToken = {
            accessToken: result.data.access_token,
            refreshToken: result.data.refresh_token,
        };
        next();
    }
    catch (error) {
        console.error("토큰 요청 실패", error);
        res.status(500).json({ message: "토큰 요청 실패" });
    }
};
exports.naverToken = naverToken;
