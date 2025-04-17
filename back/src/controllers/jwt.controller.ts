import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { JwtUserDTO } from "../types/user";

dotenv.config();
// 토큰생성
export const generateToken = (data: JwtUserDTO) => {
  const token = jwt.sign({ data }, `${process.env.JWT_SECRET_KEY}`, {
    expiresIn: `1h`,
  });
  return token;
};

// 토큰검증
export const verifyToken = (token: string) => {
  return jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
};
