import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { JwtUserDTO } from "../types/user";
import { Request, Response } from "express";

dotenv.config();

// 완료 후 정보 넘겨주기
export const successToken = (req: Request, res: Response) => {
  const data = req.jwtUser;
  res.json(data);
  return;
};
