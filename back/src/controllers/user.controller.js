"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.getUserById = exports.createUser = exports.updateUser = exports.exitUser = exports.loginUserController = exports.adminLoginUser = exports.logoutUser = void 0;
const user_model_1 = require("../models/user.model");
const error_1 = require("../utils/error");
const library_1 = require("../generated/prisma/runtime/library");
const jwt_service_1 = require("../service/jwt.service");
const login_service_1 = require("../service/login.service");
const token_1 = require("../utils/token");
const logoutUser = async (req, res, next) => {
    const logoutData = req.body;
    // 쿠키 삭제
    await res.clearCookie("jwt", {
        httpOnly: true, // HTTP Only 쿠키
        secure: process.env.NODE_ENV === "production", // HTTPS 환경에서만 적용
        sameSite: "lax", // SameSite 옵션 설정
    });
    await res.clearCookie("refresh", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    });
    try {
        const data = await (0, user_model_1.logoutModel)(logoutData);
        res.json(data);
    }
    catch (error) {
        (0, error_1.errorConsole)(error);
        next(new error_1.AppError(401, "로그아웃 할 수 없습니다.", { raw: error }));
    }
};
exports.logoutUser = logoutUser;
const adminLoginUser = async (req, res, next) => {
    const loginData = req.body;
    try {
        if (!loginData) {
            throw new Error("회원 정보가 없습니다.");
        }
        const jwtData = await (0, login_service_1.login)(loginData);
        // 에러문구인지 판별
        if (typeof jwtData === "string") {
            throw new Error(jwtData);
        }
        // 관리자 회원인지 판별
        if (!jwtData.isAdmin) {
            throw new Error("접근 권한이 없는 계정입니다.");
        }
        // 토큰발급
        const toeknData = await (0, jwt_service_1.generateToken)(jwtData);
        // 토큰 쿠키 및 DB 저장
        const data = await (0, token_1.setAuthToken)(res, toeknData, jwtData);
        res.json(data);
    }
    catch (error) {
        (0, error_1.errorConsole)(error);
        next(new error_1.AppError(401, "로그인 할 수 없습니다.", { raw: error }));
    }
};
exports.adminLoginUser = adminLoginUser;
const loginUserController = async (req, res, next) => {
    const loginData = req.body;
    try {
        if (!loginData) {
            throw new Error("회원 정보가 없습니다.");
        }
        if (!req.jwtUser) {
            return;
        }
        const jwtData = req.jwtUser;
        // 토큰발급
        const toeknData = await (0, jwt_service_1.generateToken)(jwtData);
        // 토큰 쿠키 및 DB 저장
        const data = await (0, token_1.setAuthToken)(res, toeknData, jwtData);
        res.json(data);
    }
    catch (error) {
        (0, error_1.errorConsole)(error);
        next(new error_1.AppError(401, "로그인 할 수 없습니다.", { raw: error }));
    }
};
exports.loginUserController = loginUserController;
const exitUser = async (req, res, next) => {
    const exitData = req.body;
    try {
        if (!exitData) {
            throw new Error("회원 정보가 없습니다.");
        }
        const data = await (0, user_model_1.exitUserModel)(exitData);
        res.json(data);
    }
    catch (error) {
        (0, error_1.errorConsole)(error);
        next(new error_1.AppError(401, "회원탈퇴에 실패했습니다.", { raw: error }));
    }
};
exports.exitUser = exitUser;
const updateUser = async (req, res, next) => {
    const updateData = req.body;
    try {
        if (!updateData) {
            throw new Error("회원 정보가 없습니다.");
        }
        const data = await (0, user_model_1.updateUserModel)(updateData);
        res.json(data);
    }
    catch (error) {
        (0, error_1.errorConsole)(error);
        next(new error_1.AppError(401, "회원수정에 실패했습니다.", { raw: error }));
    }
};
exports.updateUser = updateUser;
const createUser = async (req, res, next) => {
    var _a;
    const createData = req.body;
    try {
        if (!createData) {
            throw new Error("회원 정보가 없습니다.");
        }
        const data = await (0, user_model_1.createUserModel)(createData);
        res.json(data);
    }
    catch (error) {
        if (error instanceof library_1.PrismaClientKnownRequestError) {
            // Prisma 오류 코드 처리
            if (error.code === "P2002") {
                // Unique constraint violation (예: 이메일 중복)
                if (((_a = error.meta) === null || _a === void 0 ? void 0 : _a.target) === "User_email_key") {
                    throw new Error("이미 사용 중인 이메일입니다. 다른 이메일을 사용해주세요.");
                }
            }
            // 기타 Prisma 에러 처리
            throw new Error("데이터베이스 오류가 발생했습니다.");
        }
        next(new error_1.AppError(401, "회원가입에 실패했습니다.", { raw: error }));
    }
};
exports.createUser = createUser;
const getUserById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const userId = parseInt(id);
        // express는 응답을 return이 아닌 res 객체를 통해 응답을 보내는 방식
        // return res.status() 해버리면 undefined를 반환하는 거지만
        // Response로 반환한다고 해석
        if (!userId) {
            throw new Error("id가 없습니다.");
        }
        const data = await (0, user_model_1.getUserByIdModel)(userId);
        res.json(data);
    }
    catch (error) {
        (0, error_1.errorConsole)(error);
        next(new error_1.AppError(401, "회원 조회에 실패했습니다.", { raw: error }));
    }
};
exports.getUserById = getUserById;
const getAllUsers = async (req, res, next) => {
    const { isAdmin } = req.body;
    try {
        const data = await (0, user_model_1.getAllUsersModel)(isAdmin);
        res.json(data);
    }
    catch (error) {
        (0, error_1.errorConsole)(error);
        next(new error_1.AppError(401, "회원 조회에 실패했습니다.", { raw: error }));
    }
};
exports.getAllUsers = getAllUsers;
