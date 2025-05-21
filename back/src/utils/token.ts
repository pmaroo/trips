import { Response } from "express";
import { JwtUserDTO } from "../types/user";
import { refreshTokenModel } from "../models/user.model";

export const setKakaoToken = async (
  res: Response,
  toeknData: {
    accessToken: string;
    refreshToken: string;
  }
) => {
  console.log(toeknData, "toeknData");
  // 검증용
  res.cookie("kakao_access", toeknData.accessToken, {
    httpOnly: true,
    secure: false, // HTTPS 환경에서만 전달
    sameSite: "lax", // 혹은 strict, none 등
    maxAge: 1 * 60 * 60 * 1000, // 1h
  });

  // 발급용
  res.cookie("kakao_refresh", toeknData.refreshToken, {
    httpOnly: true,
    secure: false, // HTTPS 환경에서만 전달
    sameSite: "lax", // 혹은 strict, none 등
    maxAge: 3 * 24 * 60 * 60 * 1000, // 3d
  });
};

export const setAuthToken = async (
  res: Response,
  toeknData: {
    accessToken: string;
    refreshToken: string;
  },
  jwtData: JwtUserDTO
) => {
  // 검증용
  res.cookie("jwt", toeknData.accessToken, {
    httpOnly: true,
    secure: false, // HTTPS 환경에서만 전달
    sameSite: "lax", // 혹은 strict, none 등
    maxAge: 1 * 60 * 60 * 1000, // 1h
  });

  // 발급용
  res.cookie("refresh", toeknData.refreshToken, {
    httpOnly: true,
    secure: false, // HTTPS 환경에서만 전달
    sameSite: "lax", // 혹은 strict, none 등
    maxAge: 3 * 24 * 60 * 60 * 1000, // 3일
  });

  // 1회성 refreshToken
  const refreshData = {
    id: jwtData.id,
    refreshToken: toeknData.refreshToken,
  };

  // DB저장
  const data = await refreshTokenModel(refreshData);

  return data;
};
