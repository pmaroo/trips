import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { CreateUser, JwtUserDTO, LoginUser } from "../types/user";
import { Request, Response } from "express";
import { createUserModel, emailCheckModel } from "../models/user.model";
import { errorConsole } from "../utils/error";
import { login } from "../service/login.service";
import { generateToken } from "../service/jwt.service";
import { LocalStorage } from "node-localstorage";
import { setAuthToken, setKakaoToken } from "../utils/token";

dotenv.config();

// 완료 후 정보 넘겨주기
export const successToken = (req: Request, res: Response) => {
  const data = req.jwtUser;
  res.json(data);
  return;
};

// 카카오로그인
export const kakaoToken = async (req: Request, res: Response) => {
  const { code, accessToken } = req.body;
  // query는 그냥 string으로만 타입정의 할수 없기때문에 as로 확신의 타입으로 정의

  const REST_API_KEY = "9c5894d38bae2a1785adabd46325ccc6";
  const REDIRECT_URI = "http://localhost:3000/kakao";

  let tokenData = null;
  // let access_token =
  //   "1TtCZhjuhtlOR64PR9SowkZIsE1_4CrPAAAAAQoNIpkAAAGW8UQbbIE8pQXSEbh1";

  // setKakaoToken(res, {
  //   accessToken:
  //     "1TtCZhjuhtlOR64PR9SowkZIsE1_4CrPAAAAAQoNIpkAAAGW8UQbbIE8pQXSEbh1",
  //   refreshToken: "",
  // });

  if (!accessToken) {
    // 1. 인가 코드로 토큰 요청
    const tokenRes = await fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code,
      }),
    });

    tokenData = await tokenRes.json();
    setKakaoToken(res, {
      accessToken: tokenData.access_token,
      refreshToken: tokenData.refreshToken,
    });
  }

  const access_token = accessToken ? accessToken : tokenData.access_token;

  if (!access_token) {
    console.error("Access token 발급 실패", tokenData);
    res.status(401).json({ message: "토큰 발급 실패" });
    return;
  }

  // 2. 액세스 토큰으로 사용자 정보 요청
  const profileRes = await fetch("https://kapi.kakao.com/v2/user/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  });

  const profile = await profileRes.json();

  if (!profile) {
    return;
  }

  // 회원가입한 유저인지 검증
  const data = await emailCheckModel(profile.kakao_account.email);

  const createData: CreateUser = {
    email: profile.kakao_account.email,
    password: profile.kakao_account.email,
    userName: profile.kakao_account.name,
    nickName: profile.kakao_account.profile.nickname,
    isAdmin: false,
    type: "kakao",
  };

  const loginData: LoginUser = {
    email: profile.kakao_account.email,
    password: profile.kakao_account.email,
  };

  if (!data) {
    // 회원가입한 유저라면 로그인
    try {
      await createUserModel(createData);
    } catch (error) {
      errorConsole(error);
      res.status(401).json({ message: "회원가입에 실패했습니다." });
    }
  }

  try {
    const jwtData = await login(loginData);

    if (typeof jwtData === "string") {
      res.status(401).json({ message: jwtData });
      return;
    }

    const toeknData = await generateToken(jwtData);
    const data = await setAuthToken(res, toeknData, jwtData);

    res.json(data);
  } catch (error) {
    errorConsole(error);
    res.status(401).json({ message: "로그인에 실패했습니다." });
  }

  return;
};
