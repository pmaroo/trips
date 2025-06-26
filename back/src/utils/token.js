"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAuthToken = exports.setKakaoToken = void 0;
const user_model_1 = require("../models/user.model");
const setKakaoToken = async (res, toeknData) => {
    console.log(toeknData, "toeknData");
    // 검증용
    res.cookie("kakao_access", toeknData.accessToken, {
        httpOnly: true,
        secure: false, // HTTPS 환경에서만 전달
        sameSite: "lax", // 혹은 strict, none 등
        maxAge: 1 * 60 * 60 * 1000, // 1h
    });
    // 발급용
    res.cookie("kakao_refresh", toeknData.refreshToken, {
        httpOnly: true,
        secure: false, // HTTPS 환경에서만 전달
        sameSite: "lax", // 혹은 strict, none 등
        maxAge: 3 * 24 * 60 * 60 * 1000, // 3d
    });
};
exports.setKakaoToken = setKakaoToken;
const setAuthToken = async (res, toeknData, jwtData) => {
    // 검증용
    res.cookie("jwt", toeknData.accessToken, {
        httpOnly: true,
        secure: false, // HTTPS 환경에서만 전달
        sameSite: "lax", // 혹은 strict, none 등
        maxAge: 1 * 60 * 60 * 1000, // 1h
    });
    // 발급용
    res.cookie("refresh", toeknData.refreshToken, {
        httpOnly: true,
        secure: false, // HTTPS 환경에서만 전달
        sameSite: "lax", // 혹은 strict, none 등
        maxAge: 3 * 24 * 60 * 60 * 1000, // 3일
    });
    // 1회성 refreshToken
    const refreshData = {
        id: jwtData.id,
        refreshToken: toeknData.refreshToken,
    };
    // DB저장
    const data = await (0, user_model_1.refreshTokenModel)(refreshData);
    return data;
};
exports.setAuthToken = setAuthToken;
