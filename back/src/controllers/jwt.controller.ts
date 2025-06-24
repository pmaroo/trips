import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { CreateUser, JwtUserDTO, LoginUser } from "../types/user";
import { NextFunction, Request, Response } from "express";
import { createUserModel, emailCheckModel } from "../models/user.model";
import { AppError, errorConsole } from "../utils/error";
import { login } from "../service/login.service";
import { generateToken } from "../service/jwt.service";
import { LocalStorage } from "node-localstorage";
import { setAuthToken, setKakaoToken } from "../utils/token";
import axios from "axios";

dotenv.config();

// 완료 후 정보 넘겨주기
export const successToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.jwtUser;

    if (!data) {
      throw new Error("토큰 확인 유저 정보가 없습니다");
    }

    res.json(data);
  } catch (error) {
    next(error);
  }
};

// 카카오로그인
export const kakaoToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { code, accessToken } = req.body;
  // query는 그냥 string으로만 타입정의 할수 없기때문에 as로 확신의 타입으로 정의

  const REST_API_KEY = "9c5894d38bae2a1785adabd46325ccc6";
  const REDIRECT_URI = "http://localhost:3000/kakao";

  let tokenData = null;

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

    throw new Error("카카오 Access token 발급 실패");
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
    throw new Error("로그인에 실패했습니다. 카카오에서 정보 못받아옴");
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

      throw new Error("카카오 회원가입에 실패했습니다.");
    }
  }

  try {
    const jwtData = await login(loginData);

    if (typeof jwtData === "string") {
      res.status(401).json({ message: jwtData });
      throw new Error(jwtData);
    }

    const toeknData = await generateToken(jwtData);
    const data = await setAuthToken(res, toeknData, jwtData);

    res.json(data);
  } catch (error) {
    errorConsole(error);
    next(new AppError(401, "카카오 로그인에 실패했습니다.", { raw: error }));
  }

  return;
};

// 네이버 로그인
export const naverLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { accessToken, refreshToken } = req.naverToken;

  try {
    const result: any = await axios.get("https://openapi.naver.com/v1/nid/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!result) {
      console.log("네이버에서 정보 못받아옴");

      throw new Error("로그인에 실패했습니다. 네이버에서 정보 못받아옴");
    }

    const loginResult: JwtUserDTO | string = await login({
      email: result.data.response.email,
      password: result.data.response.email,
    });

    const loginData: LoginUser = {
      email: result.data.response.email,
      password: result.data.response.email,
    };

    // 일치하는 회원이 없다면 회원가입
    if (typeof loginResult === "string") {
      try {
        const createData: CreateUser = {
          email: result.data.response.email,
          password: result.data.response.email,
          userName: result.data.response.name,
          nickName: result.data.response.nickname,
          mobile: result.data.response.mobile,
          isAdmin: false,
          type: "naver",
        };

        await createUserModel(createData);
      } catch (error) {
        errorConsole(error);

        next(
          new AppError(401, "네이버 회원가입에 실패했습니다.", { raw: error })
        );
      }
    }

    try {
      const jwtData = await login(loginData);

      if (typeof jwtData === "string") {
        res.status(401).json({ message: jwtData });
        throw new Error(jwtData);
      }

      const toeknData = await generateToken(jwtData);
      const data = await setAuthToken(res, toeknData, jwtData);

      res.json(data);
      return;
    } catch (error) {
      errorConsole(error);

      next(new AppError(401, "네이버 로그인에 실패했습니다.", { raw: error }));
    }
  } catch (error) {
    console.error("토큰 요청 실패", error);

    throw new Error("네이버 토큰 요청 실패");
  }
};

// 구글로그인
export const googleLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { accessToken } = req.body;

  try {
    // 1. 액세스 토큰으로 사용자 정보 요청
    const profileRes = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!profileRes.ok) throw new Error("구글 엑세스 토큰으로 정보요청 실패");

    const profile = await profileRes.json();

    console.log(profile);

    const loginResult: JwtUserDTO | string = await login({
      email: profile.email,
      password: profile.email,
    });

    // 2. 불러온 사용자정보가 회원가입이 안되어있으면 회원가입처리
    if (typeof loginResult === "string") {
      try {
        const createData: CreateUser = {
          email: profile.email,
          password: profile.email,
          userName: profile.name,
          nickName: profile.name,
          mobile: "-",
          isAdmin: false,
          type: "google",
        };

        await createUserModel(createData);
      } catch (error) {
        console.error("회원가입 실패", error);

        next(new AppError(401, "구글 회원가입 실패", { raw: error }));
      }
    }

    const loginData: LoginUser = {
      email: profile.email,
      password: profile.email,
    };

    // 3. 로그인처리
    const jwtData = await login(loginData);

    if (typeof jwtData === "string") {
      throw new Error(`구글 : ${jwtData}`);
    }

    const toeknData = await generateToken(jwtData);
    const data = await setAuthToken(res, toeknData, jwtData);

    res.json(data);
  } catch (error) {
    console.error("토큰 요청 실패", error);
    next(new AppError(401, `구글 : 토큰 요청 실패`, { raw: error }));
  }
};
