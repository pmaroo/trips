"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// 토큰생성
const generateToken = (data) => {
    // 로그인
    const accessToken = jsonwebtoken_1.default.sign(data, `${process.env.JWT_SECRET_KEY}`, {
        expiresIn: `1h`,
    });
    // 발급용
    const refreshToken = jsonwebtoken_1.default.sign({ id: data.id }, `${process.env.JWT_SECRET_KEY}`, {
        expiresIn: `3d`,
    });
    return { accessToken, refreshToken };
};
exports.generateToken = generateToken;
// 토큰검증
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, `${process.env.JWT_SECRET_KEY}`);
};
exports.verifyToken = verifyToken;
// 발급용토큰으로 재발급
const refreshToken = (refreshToken) => {
    return jsonwebtoken_1.default.verify(refreshToken, `${process.env.JWT_SECRET_KEY}`);
};
exports.refreshToken = refreshToken;
