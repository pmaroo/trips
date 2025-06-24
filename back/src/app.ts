import express, { Request, Response, NextFunction } from "express";
import userRouter from "./routes/userRouter";
import tagRouter from "./routes/tagRouter";
import planRouter from "./routes/planRouter";
import placeRouter from "./routes/placeRouter";
import categoryRouter from "./routes/categoryRouter";
import logicRouter from "./routes/logicRouter";
import authRouter from "./routes/authRouter";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { errorConsole } from "./utils/error";
import cookieParser from "cookie-parser";
import { logErrorToDB } from "./models/auth.model";

const app: express.Application = express();

// 미들웨어
// express.json(body-parser)보다 먼저

if (process.env.NODE_ENV === "production") {
  // 배포환경
  // 보안 설정, 로그 최소화
  app.use(helmet()); // 보안 관련 HTTP 헤더 설정
  app.use(morgan(`combined`));

  app.use(
    cors({ origin: "https://your-production-frontend.com", credentials: true })
  ); // 실제 도메인으로 CORS 설정
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15분
      max: 100, // 각 IP당 100 요청 허용
    })
  );
} else if (process.env.NODE_ENV === "development") {
  // 개발환경
  app.use(morgan("dev")); // 요청 메서드,URL,응답 시간 등을 로그로 출력
  // CORS 허용 (front-back 달라서)
  app.use(cors({ origin: "http://localhost:3000", credentials: true }));
  // app.use(cors({ origin: "*", credentials: true }));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRouter);

// 라우터
app.use("/api/user", userRouter);
app.use("/api/tag", tagRouter);
app.use("/api/plan", planRouter);
app.use("/api/place", placeRouter);
app.use("/api/category", categoryRouter);
app.use("/api/logic", logicRouter);

function identifyFeature(path: string): string {
  return `${path.startsWith}`;
}

// 에러 핸들링
app.use(async (err: Error, req: Request, res: Response, next: NextFunction) => {
  const errorLog = {
    action: err.stack?.split("\n")[1]?.trim() ?? "unknown",
    context: identifyFeature(req.path),
    backCode: req.originalUrl,
    error: err.message,
    scope: "BE",
  };

  await logErrorToDB(errorLog); // 비동기 저장

  res.status(500).json({
    message: err.message,
    ...(process.env.NODE_ENV === "development" ? { stack: err.stack } : {}),
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("🌟 여행일정 홈페이지 🌟");
});

export default app;
