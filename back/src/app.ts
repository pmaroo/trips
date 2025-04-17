import express, { Request, Response, NextFunction } from "express";
import userRouter from "./routes/userRouter";
import tagRouter from "./routes/tagRouter";
import planRouter from "./routes/planRouter";
import placeRouter from "./routes/placeRouter";
import categoryRouter from "./routes/categoryRouter";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { errorConsole } from "./utils/error";

const app: express.Application = express();

// 미들웨어
app.use(express.json());
app.use(helmet()); // 보안 관련 HTTP 헤더 설정

if (process.env.NODE_ENV === "production") {
  // 배포환경
  // 보안 설정, 로그 최소화
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
}

// 라우터
app.use("/api/user", userRouter);
app.use("/api/tag", tagRouter);
app.use("/api/plan", planRouter);
app.use("/api/place", placeRouter);
app.use("/api/category", categoryRouter);

// 에러 핸들링
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorConsole(err);

  res.status(500).json({
    message: err.message + "errr",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("🌟 여행일정 홈페이지 🌟");
});

export default app;
