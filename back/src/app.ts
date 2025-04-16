import express, { Request, Response, NextFunction } from "express";
import userRouter from "./routes/userRouter";

const app: express.Application = express();

// 미들웨어
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  // 배포환경
  // 보안 설정, 로그 최소화
} else if (process.env.NODE_ENV === "development") {
  // 개발환경
  // 디버깅 도구 활성화
}

// 라우터
app.use("/api/users", userRouter);

// 에러 핸들링
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.get("/", (req: Request, res: Response) => {
  res.send("🌟 여행일정 홈페이지 🌟");
});

module.exports = app;
