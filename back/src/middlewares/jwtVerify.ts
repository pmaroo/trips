import { NextFunction, Request, Response } from "express";
import { errorConsole } from "../utils/error";
import { verifyToken } from "../controllers/jwt.controller";
import { JwtUserDTO } from "../types/user";

// 무조건 회원검증
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers[`authorization`]?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "토큰이 없습니다." });
    return;
  }

  try {
    // as <== 특정 타입임을 확신
    const user = verifyToken(token) as JwtUserDTO;
    req.jwtUser = user;
    next();
  } catch (error) {
    errorConsole(error);
    res.status(403).json({ message: "토큰이 유효하지 않습니다." });
  }
};

// 선택적 회원검증
export const optionalAuthenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers[`authorization`]?.split(" ")[1];

  if (!token) {
    // res.status(401).json({ message: "토큰이 없습니다." });
    next();
    return;
  }

  try {
    // as <== 특정 타입임을 확신
    const user = verifyToken(token) as JwtUserDTO;
    req.jwtUser = user;
    next();
  } catch (error) {
    // errorConsole(error);
    // res.status(403).json({ message: "토큰이 유효하지 않습니다." });
    next();
  }
};
