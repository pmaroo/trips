"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminOptionalAuthenticateToken = exports.adminAuthenticateToken = exports.optionalAuthenticateToken = exports.authenticateToken = void 0;
const error_1 = require("../utils/error");
const jwt_service_1 = require("../service/jwt.service");
const jsonwebtoken_1 = require("jsonwebtoken");
const user_model_1 = require("../models/user.model");
const token_1 = require("../utils/token");
const jsonwebtoken_2 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// 무조건 회원검증
const authenticateToken = async (req, res, next) => {
    var _a, _b, _c;
    const cookies = ((_a = req.headers.cookie) === null || _a === void 0 ? void 0 : _a.split("; ")) || [];
    let accessToken = (_b = cookies
        .find((cookie) => cookie.startsWith("jwt="))) === null || _b === void 0 ? void 0 : _b.split("=")[1];
    const refreshToken = (_c = cookies
        .find((cookie) => cookie.startsWith("refresh="))) === null || _c === void 0 ? void 0 : _c.split("=")[1];
    // 5. 검증 끝나면 req.jwtUser에 data 넣어주기
    if (!refreshToken) {
        // 1. refreshToken이 없을때 => 다시 로그인
        console.log("refreshToken 없음");
        res.redirect("/");
        return;
    }
    // 2. refreshToken 검증 trycatch
    try {
        const data = await (0, jwt_service_1.verifyToken)(refreshToken);
        const tokenPattern = /^[A-Za-z0-9-._~+\/]+=*$/;
        if (!tokenPattern.test(refreshToken)) {
            console.log({ message: "잘못된 토큰 형식입니다." });
            res.redirect("/");
            return;
        }
    }
    catch (error) {
        (0, error_1.errorConsole)(error);
        // refreshToken 만료됨
        if (error instanceof jsonwebtoken_1.TokenExpiredError) {
            console.log("다시 로그인을 해주세요.");
            res.redirect("/");
            console.log("토큰 유효시간 만료");
            return;
        }
        if (error instanceof jsonwebtoken_1.NotBeforeError) {
            console.log("토큰 사용 가능 시간이 아직 아닙니다.");
            console.log("다시 로그인을 해주세요.");
            res.redirect("/");
            return;
        }
        if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
            console.log("refresh 토큰이 유효하지 않습니다.");
            console.log("다시 로그인을 해주세요.");
            res.redirect("/");
            return;
        }
        console.log("인증 중 서버 오류가 발생했습니다.");
        console.log("다시 로그인을 해주세요.");
        res.redirect("/");
        return;
    }
    // 3. accessToken이 없을때 => refreshToken으로 재발급 후 다시 cookie저장
    if (accessToken === "undefined" || !accessToken) {
        const decoded = (0, jwt_service_1.verifyToken)(refreshToken);
        if (!decoded) {
            (0, error_1.errorConsole)("refreshToken으로 재발급하다가 실패");
            return;
        }
        if (typeof decoded === "object" && decoded !== null) {
            const user = decoded;
            // refreshToken으로 재발급
            accessToken = jsonwebtoken_2.default.sign({ id: decoded.id }, `${process.env.JWT_SECRET_KEY}`, {
                expiresIn: "1h",
            });
            const tokenData = {
                accessToken,
                refreshToken,
            };
            const jwtData = {
                ...user,
            };
            await (0, token_1.setAuthToken)(res, tokenData, jwtData);
        }
        else {
            throw new Error("Invalid token payload");
        }
    }
    // 4. accessToken 검증 trycatch or accessToken있을때
    try {
        // as <== 특정 타입임을 확신
        const user = (0, jwt_service_1.verifyToken)(accessToken);
        const result = await (0, user_model_1.getUserByIdModel)(user.id);
        const jwtData = {
            id: result.id,
            email: result.email,
            userName: result.userName,
            nickName: result.nickName,
            isAdmin: result.isAdmin,
        };
        req.jwtUser = jwtData;
        console.log("무조건적회원확인");
        next();
    }
    catch (error) {
        (0, error_1.errorConsole)(error);
        if (error instanceof jsonwebtoken_1.TokenExpiredError) {
            const decoded = (0, jwt_service_1.verifyToken)(refreshToken);
            if (!decoded) {
                (0, error_1.errorConsole)("refreshToken으로 재발급하다가 실패");
                return;
            }
            if (typeof decoded === "object" && decoded !== null) {
                const user = decoded;
                // refreshToken으로 재발급
                accessToken = jsonwebtoken_2.default.sign({ id: decoded.id }, `${process.env.JWT_SECRET_KEY}`, {
                    expiresIn: "1h",
                });
                const tokenData = {
                    accessToken,
                    refreshToken,
                };
                const jwtData = {
                    ...user,
                };
                await (0, token_1.setAuthToken)(res, tokenData, jwtData);
            }
            else {
                throw new Error("Invalid token payload");
            }
            console.log("토큰 유효시간 만료 재발급성공");
            next();
            return;
        }
        if (error instanceof jsonwebtoken_1.NotBeforeError) {
            console.log("토큰 사용 가능 시간이 아직 아닙니다.");
            console.log("다시 로그인을 해주세요.");
            res.redirect("/");
            return;
        }
        if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
            console.log("accessToken 토큰이 유효하지 않습니다.");
            console.log("다시 로그인을 해주세요.");
            res.redirect("/");
            return;
        }
        console.log("인증 중 서버 오류가 발생했습니다.");
        console.log("다시 로그인을 해주세요.");
        res.redirect("/");
        return;
    }
};
exports.authenticateToken = authenticateToken;
// 선택적 회원검증
const optionalAuthenticateToken = async (req, res, next) => {
    var _a, _b, _c;
    const cookies = ((_a = req.headers.cookie) === null || _a === void 0 ? void 0 : _a.split("; ")) || [];
    let accessToken = (_b = cookies
        .find((cookie) => cookie.startsWith("jwt="))) === null || _b === void 0 ? void 0 : _b.split("=")[1];
    const refreshToken = (_c = cookies
        .find((cookie) => cookie.startsWith("refresh="))) === null || _c === void 0 ? void 0 : _c.split("=")[1];
    // 5. 검증 끝나면 req.jwtUser에 data 넣어주기
    if (!refreshToken) {
        // 1. refreshToken이 없을때 => 다시 로그인
        console.log("refreshToken 없음");
        next();
        return;
    }
    // 2. refreshToken 검증 trycatch
    try {
        await (0, jwt_service_1.verifyToken)(refreshToken);
        const tokenPattern = /^[A-Za-z0-9-._~+\/]+=*$/;
        if (!tokenPattern.test(refreshToken)) {
            next();
            return;
        }
    }
    catch (error) {
        (0, error_1.errorConsole)(error);
        // refreshToken 만료됨
        if (error instanceof jsonwebtoken_1.TokenExpiredError) {
            console.log("토큰 유효시간 만료");
            next();
            return;
        }
        if (error instanceof jsonwebtoken_1.NotBeforeError) {
            console.log("토큰 사용 가능 시간이 아직 아닙니다.");
            next();
            return;
        }
        if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
            console.log("토큰이 유효하지 않습니다.");
            next();
            return;
        }
        console.log("인증 중 서버 오류가 발생했습니다.");
        next();
        return;
    }
    // 3. accessToken이 없을때 => refreshToken으로 재발급 후 다시 cookie저장
    if (!accessToken) {
        const decoded = (0, jwt_service_1.verifyToken)(refreshToken);
        if (!decoded) {
            (0, error_1.errorConsole)("refreshToken으로 재발급하다가 실패");
            next();
            return;
        }
        if (typeof decoded === "object" && decoded !== null) {
            const user = decoded;
            // refreshToken으로 재발급
            accessToken = jsonwebtoken_2.default.sign({ id: decoded.id }, `${process.env.JWT_SECRET_KEY}`, {
                expiresIn: "1h",
            });
            const tokenData = {
                accessToken,
                refreshToken,
            };
            const jwtData = {
                ...user,
            };
            await (0, token_1.setAuthToken)(res, tokenData, jwtData);
        }
        else {
            console.log("decoded가 string임");
            next();
            return;
        }
    }
    // 4. accessToken 검증 trycatch or accessToken있을때
    try {
        // as <== 특정 타입임을 확신
        const user = (0, jwt_service_1.verifyToken)(accessToken);
        req.jwtUser = user;
        console.log("무조건적회원확인");
        next();
    }
    catch (error) {
        (0, error_1.errorConsole)(error);
        if (error instanceof jsonwebtoken_1.TokenExpiredError) {
            const decoded = (0, jwt_service_1.verifyToken)(refreshToken);
            if (!decoded) {
                (0, error_1.errorConsole)("refreshToken으로 재발급하다가 실패");
                next();
                return;
            }
            if (typeof decoded === "object" && decoded !== null) {
                const user = decoded;
                // refreshToken으로 재발급
                accessToken = jsonwebtoken_2.default.sign({ id: decoded.id }, `${process.env.JWT_SECRET_KEY}`, {
                    expiresIn: "1h",
                });
                const tokenData = {
                    accessToken,
                    refreshToken,
                };
                const jwtData = {
                    ...user,
                };
                await (0, token_1.setAuthToken)(res, tokenData, jwtData);
            }
            else {
                console.log("decoded가 string임");
                next();
                return;
            }
            console.log("토큰 유효시간 만료 재발급성공");
            next();
            return;
        }
        if (error instanceof jsonwebtoken_1.NotBeforeError) {
            console.log("토큰 사용 가능 시간이 아직 아닙니다.");
            console.log("다시 로그인을 해주세요.");
            res.redirect("/");
            return;
        }
        if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
            console.log("토큰이 유효하지 않습니다.");
            console.log("다시 로그인을 해주세요.");
            res.redirect("/");
            return;
        }
        console.log("인증 중 서버 오류가 발생했습니다.");
        console.log("다시 로그인을 해주세요.");
        res.redirect("/");
        return;
    }
};
exports.optionalAuthenticateToken = optionalAuthenticateToken;
// 무조건적 관리자 검증
const adminAuthenticateToken = async (req, res, next) => {
    var _a, _b, _c;
    const cookies = ((_a = req.headers.cookie) === null || _a === void 0 ? void 0 : _a.split("; ")) || [];
    let accessToken = (_b = cookies
        .find((cookie) => cookie.startsWith("jwt="))) === null || _b === void 0 ? void 0 : _b.split("=")[1];
    const refreshToken = (_c = cookies
        .find((cookie) => cookie.startsWith("refresh="))) === null || _c === void 0 ? void 0 : _c.split("=")[1];
    // 5. 검증 끝나면 req.jwtUser에 data 넣어주기
    if (!refreshToken) {
        // 1. refreshToken이 없을때 => 다시 로그인
        console.log("refreshToken 없음");
        res.redirect("/admin");
        return;
    }
    // 2. refreshToken 검증 trycatch
    try {
        await (0, jwt_service_1.verifyToken)(refreshToken);
        const tokenPattern = /^[A-Za-z0-9-._~+\/]+=*$/;
        if (!tokenPattern.test(refreshToken)) {
            console.log("잘못된 토큰 형식입니다.");
            res.redirect("/admin");
            return;
        }
    }
    catch (error) {
        (0, error_1.errorConsole)(error);
        // refreshToken 만료됨
        if (error instanceof jsonwebtoken_1.TokenExpiredError) {
            console.log("다시 로그인을 해주세요.");
            res.redirect("/admin");
            console.log("토큰 유효시간 만료");
            return;
        }
        if (error instanceof jsonwebtoken_1.NotBeforeError) {
            console.log("토큰 사용 가능 시간이 아직 아닙니다.");
            console.log("다시 로그인을 해주세요.");
            res.redirect("/admin");
            return;
        }
        if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
            console.log("토큰이 유효하지 않습니다.");
            console.log("다시 로그인을 해주세요.");
            res.redirect("/admin");
            return;
        }
        console.log("인증 중 서버 오류가 발생했습니다.");
        console.log("다시 로그인을 해주세요.");
        res.redirect("/admin");
        return;
    }
    // 3. accessToken이 없을때 => refreshToken으로 재발급 후 다시 cookie저장
    if (!accessToken) {
        const decoded = (0, jwt_service_1.verifyToken)(refreshToken);
        if (!decoded) {
            (0, error_1.errorConsole)("refreshToken으로 재발급하다가 실패");
            return;
        }
        if (typeof decoded === "object" && decoded !== null) {
            const user = decoded;
            // refreshToken으로 재발급
            accessToken = jsonwebtoken_2.default.sign({ id: decoded.id }, `${process.env.JWT_SECRET_KEY}`, {
                expiresIn: "1h",
            });
            const tokenData = {
                accessToken,
                refreshToken,
            };
            const jwtData = {
                ...user,
            };
            await (0, token_1.setAuthToken)(res, tokenData, jwtData);
        }
        else {
            throw new Error("Invalid token payload");
        }
    }
    // 4. accessToken 검증 trycatch or accessToken있을때
    try {
        // as <== 특정 타입임을 확신
        const user = (0, jwt_service_1.verifyToken)(accessToken);
        if (!user.isAdmin) {
            console.log("관리자 회원이 아닙니다.");
            res.redirect("/admin");
            return;
        }
        req.jwtUser = user;
        console.log("무조건적관리자확인");
        next();
        return;
    }
    catch (error) {
        (0, error_1.errorConsole)(error);
        if (error instanceof jsonwebtoken_1.TokenExpiredError) {
            const decoded = (0, jwt_service_1.verifyToken)(refreshToken);
            if (!decoded) {
                (0, error_1.errorConsole)("refreshToken으로 재발급하다가 실패");
                return;
            }
            if (typeof decoded === "object" && decoded !== null) {
                const user = decoded;
                // refreshToken으로 재발급
                accessToken = jsonwebtoken_2.default.sign({ id: decoded.id }, `${process.env.JWT_SECRET_KEY}`, {
                    expiresIn: "1h",
                });
                const tokenData = {
                    accessToken,
                    refreshToken,
                };
                const jwtData = {
                    ...user,
                };
                await (0, token_1.setAuthToken)(res, tokenData, jwtData);
            }
            else {
                throw new Error("Invalid token payload");
            }
            console.log("토큰 유효시간 만료 재발급성공");
            next();
            return;
        }
        if (error instanceof jsonwebtoken_1.NotBeforeError) {
            console.log("토큰 사용 가능 시간이 아직 아닙니다.");
            console.log("다시 로그인을 해주세요.");
            res.redirect("/admin");
            return;
        }
        if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
            console.log("토큰이 유효하지 않습니다.");
            console.log("다시 로그인을 해주세요.");
            res.redirect("/admin");
            return;
        }
        console.log("인증 중 서버 오류가 발생했습니다.");
        console.log("다시 로그인을 해주세요.");
        res.redirect("/admin");
        return;
    }
};
exports.adminAuthenticateToken = adminAuthenticateToken;
// 선택적 관리자 검증
const adminOptionalAuthenticateToken = async (req, res, next) => {
    var _a, _b, _c;
    const cookies = ((_a = req.headers.cookie) === null || _a === void 0 ? void 0 : _a.split("; ")) || [];
    let accessToken = (_b = cookies
        .find((cookie) => cookie.startsWith("jwt="))) === null || _b === void 0 ? void 0 : _b.split("=")[1];
    const refreshToken = (_c = cookies
        .find((cookie) => cookie.startsWith("refresh="))) === null || _c === void 0 ? void 0 : _c.split("=")[1];
    // 5. 검증 끝나면 req.jwtUser에 data 넣어주기
    if (!refreshToken) {
        // 1. refreshToken이 없을때 => 다시 로그인
        console.log("refreshToken 없음");
        next();
        return;
    }
    // 2. refreshToken 검증 trycatch
    try {
        await (0, jwt_service_1.verifyToken)(refreshToken);
        const tokenPattern = /^[A-Za-z0-9-._~+\/]+=*$/;
        if (!tokenPattern.test(refreshToken)) {
            console.log("잘못된 토큰 형식입니다.");
            next();
            return;
        }
    }
    catch (error) {
        (0, error_1.errorConsole)(error);
        // refreshToken 만료됨
        if (error instanceof jsonwebtoken_1.TokenExpiredError) {
            console.log("토큰 유효시간 만료");
            next();
            return;
        }
        if (error instanceof jsonwebtoken_1.NotBeforeError) {
            console.log("토큰 사용 가능 시간이 아직 아닙니다.");
            next();
            return;
        }
        if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
            console.log("토큰이 유효하지 않습니다.");
            next();
            return;
        }
        console.log("인증 중 서버 오류가 발생했습니다.");
        next();
        return;
    }
    // 3. accessToken이 없을때 => refreshToken으로 재발급 후 다시 cookie저장
    if (!accessToken) {
        const decoded = (0, jwt_service_1.verifyToken)(refreshToken);
        if (!decoded) {
            (0, error_1.errorConsole)("refreshToken으로 재발급하다가 실패");
            return;
        }
        if (typeof decoded === "object" && decoded !== null) {
            const user = decoded;
            // refreshToken으로 재발급
            accessToken = jsonwebtoken_2.default.sign({ id: decoded.id }, `${process.env.JWT_SECRET_KEY}`, {
                expiresIn: "1h",
            });
            const tokenData = {
                accessToken,
                refreshToken,
            };
            const jwtData = {
                ...user,
            };
            await (0, token_1.setAuthToken)(res, tokenData, jwtData);
        }
        else {
            console.log("decoded가 string임");
            next();
            return;
        }
    }
    // 4. accessToken 검증 trycatch or accessToken있을때
    try {
        // as <== 특정 타입임을 확신
        const user = (0, jwt_service_1.verifyToken)(accessToken);
        if (!user.isAdmin) {
            console.log("관리자 회원이 아닙니다.");
            next();
            return;
        }
        req.jwtUser = user;
        console.log("선택적관리자확인");
        next();
    }
    catch (error) {
        (0, error_1.errorConsole)(error);
        if (error instanceof jsonwebtoken_1.TokenExpiredError) {
            const decoded = (0, jwt_service_1.verifyToken)(refreshToken);
            if (!decoded) {
                (0, error_1.errorConsole)("refreshToken으로 재발급하다가 실패");
                next();
                return;
            }
            if (typeof decoded === "object" && decoded !== null) {
                const user = decoded;
                // refreshToken으로 재발급
                accessToken = jsonwebtoken_2.default.sign({ id: decoded.id }, `${process.env.JWT_SECRET_KEY}`, {
                    expiresIn: "1h",
                });
                const tokenData = {
                    accessToken,
                    refreshToken,
                };
                const jwtData = {
                    ...user,
                };
                await (0, token_1.setAuthToken)(res, tokenData, jwtData);
            }
            else {
                console.log("decoded가 stringd임");
                next();
            }
            console.log("토큰 유효시간 만료 재발급성공");
            next();
            return;
        }
        if (error instanceof jsonwebtoken_1.NotBeforeError) {
            console.log("토큰 사용 가능 시간이 아직 아닙니다.");
            next();
            return;
        }
        if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
            console.log("토큰이 유효하지 않습니다.");
            next();
            return;
        }
        console.log("인증 중 서버 오류가 발생했습니다.");
        next();
        return;
    }
};
exports.adminOptionalAuthenticateToken = adminOptionalAuthenticateToken;
