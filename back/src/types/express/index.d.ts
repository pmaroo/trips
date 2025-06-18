import { Request } from "express";
import { JwtUserDTO } from "../user";

declare module "express-session" {
  interface Session {
    jwtUser?: JwtUserDTO; // 세션에 JWT 사용자 정보 추가
    token?: string;
    naverToken: { accessToken: string; refreshToken: string };
  }
}

declare global {
  namespace Express {
    interface Request {
      jwtUser?: JwtUserDTO; // JWT 사용자 정보
      naverToken: { accessToken: string; refreshToken: string };
    }
  }
}

export {};
