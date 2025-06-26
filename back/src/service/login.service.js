"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const login = async (loginData) => {
    // 이메일체크
    const emailCheck = await (0, user_model_1.emailCheckModel)(loginData.email);
    if (!emailCheck) {
        const message = "일치하는 회원이 없습니다.";
        return message;
    }
    // 비밀번호체크
    const data = await bcrypt_1.default.compare(loginData.password, emailCheck.password);
    if (!data) {
        const message = "이메일 혹은 비밀번호가 일치하지 않습니다.";
        return message;
    }
    const jwtData = {
        id: emailCheck.id,
        email: emailCheck.email,
        userName: emailCheck.userName,
        nickName: emailCheck.nickName,
        isAdmin: emailCheck.isAdmin,
    };
    return jwtData;
};
exports.login = login;
