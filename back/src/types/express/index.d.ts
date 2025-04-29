import { Request } from "express";
import { JwtUserDTO } from "../user";

declare global {
  namespace Express {
    interface Request {
      jwtUser?: JwtUserDTO; // 또는 적절한 타입으로 변경
    }
  }
}

export {};
