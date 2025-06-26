"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const tagRouter_1 = __importDefault(require("./routes/tagRouter"));
const planRouter_1 = __importDefault(require("./routes/planRouter"));
const placeRouter_1 = __importDefault(require("./routes/placeRouter"));
const categoryRouter_1 = __importDefault(require("./routes/categoryRouter"));
const logicRouter_1 = __importDefault(require("./routes/logicRouter"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_model_1 = require("./models/auth.model");
const app = (0, express_1.default)();
// 미들웨어
// express.json(body-parser)보다 먼저
if (process.env.NODE_ENV === "production") {
    // 배포환경
    // 보안 설정, 로그 최소화
    app.use((0, helmet_1.default)()); // 보안 관련 HTTP 헤더 설정
    app.use((0, morgan_1.default)(`combined`));
    app.use((0, cors_1.default)({ origin: "https://trips-ebon.vercel.app", credentials: true })); // 실제 도메인으로 CORS 설정
    app.use((0, express_rate_limit_1.default)({
        windowMs: 15 * 60 * 1000, // 15분
        max: 100, // 각 IP당 100 요청 허용
    }));
}
else if (process.env.NODE_ENV === "development") {
    // 개발환경
    app.use((0, morgan_1.default)("dev")); // 요청 메서드,URL,응답 시간 등을 로그로 출력
    // CORS 허용 (front-back 달라서)
    app.use((0, cors_1.default)({ origin: "http://localhost:3000", credentials: true }));
    // app.use(cors({ origin: "*", credentials: true }));
}
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use("/api/auth", authRouter_1.default);
// 라우터
app.use("/api/user", userRouter_1.default);
app.use("/api/tag", tagRouter_1.default);
app.use("/api/plan", planRouter_1.default);
app.use("/api/place", placeRouter_1.default);
app.use("/api/category", categoryRouter_1.default);
app.use("/api/logic", logicRouter_1.default);
function identifyFeature(path) {
    return `${path.startsWith}`;
}
// 에러 핸들링
app.use(async (err, req, res, next) => {
    var _a, _b, _c;
    const errorLog = {
        action: (_c = (_b = (_a = err.stack) === null || _a === void 0 ? void 0 : _a.split("\n")[1]) === null || _b === void 0 ? void 0 : _b.trim()) !== null && _c !== void 0 ? _c : "unknown",
        context: identifyFeature(req.path),
        backCode: req.originalUrl,
        error: err.message,
        scope: "BE",
    };
    await (0, auth_model_1.logErrorToDB)(errorLog); // 비동기 저장
    res.status(500).json({
        message: err.message,
        ...(process.env.NODE_ENV === "development" ? { stack: err.stack } : {}),
    });
});
app.get("/", (req, res) => {
    res.send("🌟 여행일정 홈페이지 🌟");
});
exports.default = app;
