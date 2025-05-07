import { NextFunction, Request, Response } from "express";
import { errorConsole } from "../utils/error";
import { generateToken, verifyToken } from "../service/jwt.service";
import { JwtUserDTO } from "../types/user";
import {
  JsonWebTokenError,
  NotBeforeError,
  TokenExpiredError,
} from "jsonwebtoken";
import {
  refreshTokenCheckModel,
  refreshTokenDeleteModel,
} from "../models/user.model";
import { setAuthToken } from "../utils/token";

// 무조건 회원검증
export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookies = req.headers.cookie?.split("; ") || [];
  const accessToken = cookies
    .find((cookie) => cookie.startsWith("jwt="))
    ?.split("=")[1];
  const refreshToken = cookies
    .find((cookie) => cookie.startsWith("refresh="))
    ?.split("=")[1];

  if (!accessToken || !refreshToken) {
    res.status(401).json({ message: "토큰이 없습니다." });
    res.redirect("/admin");
    return;
  }

  const tokenPattern = /^[A-Za-z0-9-._~+\/]+=*$/;
  if (!tokenPattern.test(accessToken) || !tokenPattern.test(refreshToken)) {
    res.status(400).json({ message: "잘못된 토큰 형식입니다." });
    res.redirect("/admin");
    return;
  }

  try {
    // as <== 특정 타입임을 확신
    const user = verifyToken(accessToken) as JwtUserDTO;
    req.jwtUser = user;

    console.log("무조건적회원확인");

    next();
  } catch (error) {
    errorConsole(error);
    if (error instanceof TokenExpiredError) {
      // 발급용 토큰 검증
      const refresh = await refreshTokenCheckModel(refreshToken);

      // 발급용 토큰 검증에 실패했다면 다시 로그인
      if (!refresh) {
        await refreshTokenDeleteModel(refreshToken);
        console.log("토큰 유효시간 만료 및 검증실패");
        res.status(401).json({ message: "다시 로그인을 해주세요." });
        res.redirect("/admin");
        return;
      }

      const jwtData: JwtUserDTO = {
        id: refresh.id,
        email: refresh.email,
        userName: refresh.userName,
        nickName: refresh.nickName,
        isAdmin: refresh.isAdmin,
      };

      // 토큰발급
      const toeknData = await generateToken(jwtData);

      // 토큰 쿠키 및 DB 저장
      const result = await setAuthToken(res, toeknData, jwtData);

      if (result) {
        // 다시 확인
        const data = await refreshTokenCheckModel(toeknData.refreshToken);

        // 발급용 토큰 검증에 실패했다면 다시 로그인
        if (!data) {
          await refreshTokenDeleteModel(toeknData.refreshToken);
          console.log("다시 발급받은 토큰에 문제_A1");
          res.status(401).json({ message: "다시 로그인을 해주세요." });
          res.redirect("/admin");
          return;
        }

        const jwtData: JwtUserDTO = {
          id: data.id,
          email: data.email,
          userName: data.userName,
          nickName: data.nickName,
          isAdmin: data.isAdmin,
        };

        req.jwtUser = jwtData;
      } else {
        console.log("DB저장 실패");
        res.status(401).json({ message: "다시 로그인을 해주세요." });
        res.redirect("/admin");
        return;
      }

      console.log("토큰 유효시간 만료 재발급성공");
      next();
      return;
    }

    if (error instanceof NotBeforeError) {
      console.log("토큰 사용 가능 시간이 아직 아닙니다.");
      res.status(401).json({ message: "다시 로그인을 해주세요." });
      res.redirect("/admin");
      return;
    }

    if (error instanceof JsonWebTokenError) {
      console.log("토큰이 유효하지 않습니다.");
      res.status(403).json({ message: "다시 로그인을 해주세요." });
      res.redirect("/admin");

      return;
    }

    console.log("인증 중 서버 오류가 발생했습니다.");
    res.status(500).json({ message: "다시 로그인을 해주세요." });
    res.redirect("/admin");

    return;
  }
};

// 선택적 회원검증
export const optionalAuthenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookies = req.headers.cookie?.split("; ") || [];
  const accessToken = cookies
    .find((cookie) => cookie.startsWith("jwt="))
    ?.split("=")[1];
  const refreshToken = cookies
    .find((cookie) => cookie.startsWith("refresh="))
    ?.split("=")[1];

  if (!accessToken || !refreshToken) {
    console.log("토큰이 없습니다.");
    next();
    return;
  }

  const tokenPattern = /^[A-Za-z0-9-._~+\/]+=*$/;
  if (!tokenPattern.test(accessToken) || !tokenPattern.test(refreshToken)) {
    console.log("잘못된 토큰 형식입니다.");
    next();
    return;
  }

  try {
    // as <== 특정 타입임을 확신
    const user = verifyToken(accessToken) as JwtUserDTO;
    req.jwtUser = user;

    console.log("선택적회원확인");

    next();
  } catch (error) {
    errorConsole(error);
    if (error instanceof TokenExpiredError) {
      // 발급용 토큰 검증
      const refresh = await refreshTokenCheckModel(refreshToken);

      // 발급용 토큰 검증에 실패했다면 다시 로그인
      if (!refresh) {
        await refreshTokenDeleteModel(refreshToken);
        console.log("토큰 유효시간 만료 및 검증실패");
        next();
        return;
      }

      const jwtData: JwtUserDTO = {
        id: refresh.id,
        email: refresh.email,
        userName: refresh.userName,
        nickName: refresh.nickName,
        isAdmin: refresh.isAdmin,
      };

      // 토큰발급
      const toeknData = await generateToken(jwtData);

      // 토큰 쿠키 및 DB 저장
      const result = await setAuthToken(res, toeknData, jwtData);

      if (result) {
        // 다시 확인
        const data = await refreshTokenCheckModel(toeknData.refreshToken);

        // 발급용 토큰 검증에 실패했다면 다시 로그인
        if (!data) {
          await refreshTokenDeleteModel(toeknData.refreshToken);
          console.log("다시 발급받은 토큰에 문제_A1");
          next();
          return;
        }

        const jwtData: JwtUserDTO = {
          id: data.id,
          email: data.email,
          userName: data.userName,
          nickName: data.nickName,
          isAdmin: data.isAdmin,
        };

        req.jwtUser = jwtData;
      } else {
        console.log("DB저장 실패");
        next();
        return;
      }

      console.log("토큰 유효시간 만료 재발급성공");
      next();
      return;
    }

    if (error instanceof NotBeforeError) {
      console.log("토큰 사용 가능 시간이 아직 아닙니다.");
      next();
      return;
    }

    if (error instanceof JsonWebTokenError) {
      console.log("토큰이 유효하지 않습니다.");
      next();
      return;
    }

    console.log("인증 중 서버 오류가 발생했습니다.");
    next();
    return;
  }
};

// 무조건적 관리자 검증
export const adminAuthenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookies = req.headers.cookie?.split("; ") || [];
  const accessToken = cookies
    .find((cookie) => cookie.startsWith("jwt="))
    ?.split("=")[1];
  const refreshToken = cookies
    .find((cookie) => cookie.startsWith("refresh="))
    ?.split("=")[1];

  if (!accessToken || !refreshToken) {
    res.status(401).json({ message: "토큰이 없습니다." });
    res.redirect("/admin");

    return;
  }

  const tokenPattern = /^[A-Za-z0-9-._~+\/]+=*$/;
  if (!tokenPattern.test(accessToken) || !tokenPattern.test(refreshToken)) {
    res.status(400).json({ message: "잘못된 토큰 형식입니다." });
    return;
  }

  try {
    // as <== 특정 타입임을 확신
    const user = verifyToken(accessToken) as JwtUserDTO;
    req.jwtUser = user;

    if (!user.isAdmin) {
      res.status(401).json({ message: "접근 권한이 없습니다." });
      return;
    }

    console.log("무조건적관리자확인");

    next();
  } catch (error) {
    errorConsole(error);
    if (error instanceof TokenExpiredError) {
      // 발급용 토큰 검증
      const refresh = await refreshTokenCheckModel(refreshToken);

      // 발급용 토큰 검증에 실패했다면 다시 로그인
      if (!refresh) {
        await refreshTokenDeleteModel(refreshToken);
        console.log("토큰 유효시간 만료 및 검증실패");
        res.status(401).json({ message: "다시 로그인을 해주세요." });
        res.redirect("/admin");
        return;
      }

      const jwtData: JwtUserDTO = {
        id: refresh.id,
        email: refresh.email,
        userName: refresh.userName,
        nickName: refresh.nickName,
        isAdmin: refresh.isAdmin,
      };

      // 토큰발급
      const toeknData = await generateToken(jwtData);

      // 토큰 쿠키 및 DB 저장
      const result = await setAuthToken(res, toeknData, jwtData);

      if (result) {
        // 다시 확인
        const data = await refreshTokenCheckModel(toeknData.refreshToken);

        // 발급용 토큰 검증에 실패했다면 다시 로그인
        if (!data) {
          await refreshTokenDeleteModel(toeknData.refreshToken);
          console.log("다시 발급받은 토큰에 문제_A1");
          res.status(401).json({ message: "다시 로그인을 해주세요." });
          res.redirect("/admin");
          return;
        }

        const jwtData: JwtUserDTO = {
          id: data.id,
          email: data.email,
          userName: data.userName,
          nickName: data.nickName,
          isAdmin: data.isAdmin,
        };

        req.jwtUser = jwtData;
      } else {
        console.log("DB저장 실패");
        res.status(401).json({ message: "다시 로그인을 해주세요." });
        res.redirect("/admin");
        return;
      }

      console.log("토큰 유효시간 만료 재발급성공");
      next();
      return;
    }

    if (error instanceof NotBeforeError) {
      console.log("토큰 사용 가능 시간이 아직 아닙니다.");
      res.status(401).json({ message: "다시 로그인을 해주세요." });
      res.redirect("/admin");
      return;
    }

    if (error instanceof JsonWebTokenError) {
      console.log("토큰이 유효하지 않습니다.");
      res.status(403).json({ message: "다시 로그인을 해주세요." });
      res.redirect("/admin");

      return;
    }

    console.log("인증 중 서버 오류가 발생했습니다.");
    res.status(500).json({ message: "다시 로그인을 해주세요." });
    res.redirect("/admin");

    return;
  }
};

// 선택적 관리자 검증
export const adminOptionalAuthenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookies = req.headers.cookie?.split("; ") || [];
  const accessToken = cookies
    .find((cookie) => cookie.startsWith("jwt="))
    ?.split("=")[1];
  const refreshToken = cookies
    .find((cookie) => cookie.startsWith("refresh="))
    ?.split("=")[1];

  if (!accessToken || !refreshToken) {
    console.log("토큰이 없습니다.");
    next();
    return;
  }

  const tokenPattern = /^[A-Za-z0-9-._~+\/]+=*$/;
  if (!tokenPattern.test(accessToken) || !tokenPattern.test(refreshToken)) {
    console.log("잘못된 토큰 형식입니다.");
    next();
    return;
  }

  try {
    // as <== 특정 타입임을 확신
    const user = verifyToken(accessToken) as JwtUserDTO;
    req.jwtUser = user;

    if (!user.isAdmin) {
      res.status(401).json({ message: "접근 권한이 없습니다." });
      res.redirect("/admin");
      return;
    }

    console.log("선택적관리자확인");

    next();
  } catch (error) {
    errorConsole(error);
    if (error instanceof TokenExpiredError) {
      // 발급용 토큰 검증
      const refresh = await refreshTokenCheckModel(refreshToken);

      // 발급용 토큰 검증에 실패했다면 다시 로그인
      if (!refresh) {
        await refreshTokenDeleteModel(refreshToken);
        console.log("토큰 유효시간 만료 및 검증실패");
        next();
        return;
      }

      const jwtData: JwtUserDTO = {
        id: refresh.id,
        email: refresh.email,
        userName: refresh.userName,
        nickName: refresh.nickName,
        isAdmin: refresh.isAdmin,
      };

      // 토큰발급
      const toeknData = await generateToken(jwtData);

      // 토큰 쿠키 및 DB 저장
      const result = await setAuthToken(res, toeknData, jwtData);

      if (result) {
        // 다시 확인
        const data = await refreshTokenCheckModel(toeknData.refreshToken);

        // 발급용 토큰 검증에 실패했다면 다시 로그인
        if (!data) {
          await refreshTokenDeleteModel(toeknData.refreshToken);
          console.log("다시 발급받은 토큰에 문제_A1");
          next();
          return;
        }

        const jwtData: JwtUserDTO = {
          id: data.id,
          email: data.email,
          userName: data.userName,
          nickName: data.nickName,
          isAdmin: data.isAdmin,
        };

        req.jwtUser = jwtData;
      } else {
        console.log("DB저장 실패");
        next();
        return;
      }

      console.log("토큰 유효시간 만료 재발급성공");
      next();
      return;
    }

    if (error instanceof NotBeforeError) {
      console.log("토큰 사용 가능 시간이 아직 아닙니다.");
      next();
      return;
    }

    if (error instanceof JsonWebTokenError) {
      console.log("토큰이 유효하지 않습니다.");
      next();
      return;
    }

    console.log("인증 중 서버 오류가 발생했습니다.");
    next();
    return;
  }
};
