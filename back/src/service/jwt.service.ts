import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { JwtUserDTO } from "../types/user";

dotenv.config();
// 토큰생성
export const generateToken = (data: JwtUserDTO) => {
  // 로그인
  const accessToken = jwt.sign(data, `${process.env.JWT_SECRET_KEY}`, {
    expiresIn: `1h`,
  });
  // 발급용
  const refreshToken = jwt.sign(
    { id: data.id },
    `${process.env.JWT_SECRET_KEY}`,
    {
      expiresIn: `3d`,
    }
  );

  return { accessToken, refreshToken };
};

// 토큰검증
export const verifyToken = (token: string) => {
  return jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
};

// 발급용토큰으로 재발급
export const refreshToken = (refreshToken: string) => {
  return jwt.verify(refreshToken, `${process.env.JWT_SECRET_KEY}`);
};
