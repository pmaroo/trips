import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { JwtUserDTO } from "../types/user";
import { Request, Response } from "express";

dotenv.config();
// 토큰생성
export const generateToken = (data: JwtUserDTO) => {
  const token = jwt.sign(data, `${process.env.JWT_SECRET_KEY}`, {
    expiresIn: `3d`,
  });
  return token;
};

// 토큰검증
export const verifyToken = (token: string) => {
  return jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
};

export const successToken = (req: Request, res: Response) => {
  const data = req.jwtUser;
  res.json(data);
  return;
};
