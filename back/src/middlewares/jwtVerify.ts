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
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// 무조건 회원검증
export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookies = req.headers.cookie?.split("; ") || [];
  let accessToken = cookies
    .find((cookie) => cookie.startsWith("jwt="))
    ?.split("=")[1];
  const refreshToken = cookies
    .find((cookie) => cookie.startsWith("refresh="))
    ?.split("=")[1];

  // 5. 검증 끝나면 req.jwtUser에 data 넣어주기

  if (!refreshToken) {
    // 1. refreshToken이 없을때 => 다시 로그인
    console.log("refreshToken 없음");
    res.redirect("/");
    return;
  }
  // 2. refreshToken 검증 trycatch
  try {
    await verifyToken(refreshToken);

    const tokenPattern = /^[A-Za-z0-9-._~+\/]+=*$/;
    if (!tokenPattern.test(refreshToken)) {
      res.status(400).json({ message: "잘못된 토큰 형식입니다." });
      res.redirect("/");
      return;
    }
  } catch (error) {
    errorConsole(error);
    // refreshToken 만료됨
    if (error instanceof TokenExpiredError) {
      res.status(401).json({ message: "다시 로그인을 해주세요." });
      res.redirect("/");
      console.log("토큰 유효시간 만료");
      return;
    }

    if (error instanceof NotBeforeError) {
      console.log("토큰 사용 가능 시간이 아직 아닙니다.");
      res.status(401).json({ message: "다시 로그인을 해주세요." });
      res.redirect("/");
      return;
    }

    if (error instanceof JsonWebTokenError) {
      console.log("토큰이 유효하지 않습니다.");
      res.status(403).json({ message: "다시 로그인을 해주세요." });
      res.redirect("/");

      return;
    }

    console.log("인증 중 서버 오류가 발생했습니다.");
    res.status(500).json({ message: "다시 로그인을 해주세요." });
    res.redirect("/");

    return;
  }

  // 3. accessToken이 없을때 => refreshToken으로 재발급 후 다시 cookie저장
  if (!accessToken) {
    const decoded = verifyToken(refreshToken);

    if (!decoded) {
      errorConsole("refreshToken으로 재발급하다가 실패");
      return;
    }

    if (typeof decoded === "object" && decoded !== null) {
      const user = decoded as JwtUserDTO;

      // refreshToken으로 재발급
      accessToken = jwt.sign(
        { id: decoded.id },
        `${process.env.JWT_SECRET_KEY}`,
        {
          expiresIn: "1h",
        }
      );

      const tokenData = {
        accessToken,
        refreshToken,
      };

      const jwtData = {
        ...user,
      };

      await setAuthToken(res, tokenData, jwtData);
    } else {
      throw new Error("Invalid token payload");
    }
  }

  // 4. accessToken 검증 trycatch or accessToken있을때
  try {
    // as <== 특정 타입임을 확신
    const user = verifyToken(accessToken) as JwtUserDTO;
    req.jwtUser = user;

    console.log("무조건적회원확인");

    next();
  } catch (error) {
    errorConsole(error);
    if (error instanceof TokenExpiredError) {
      const decoded = verifyToken(refreshToken);

      if (!decoded) {
        errorConsole("refreshToken으로 재발급하다가 실패");
        return;
      }

      if (typeof decoded === "object" && decoded !== null) {
        const user = decoded as JwtUserDTO;

        // refreshToken으로 재발급
        accessToken = jwt.sign(
          { id: decoded.id },
          `${process.env.JWT_SECRET_KEY}`,
          {
            expiresIn: "1h",
          }
        );

        const tokenData = {
          accessToken,
          refreshToken,
        };

        const jwtData = {
          ...user,
        };

        await setAuthToken(res, tokenData, jwtData);
      } else {
        throw new Error("Invalid token payload");
      }

      console.log("토큰 유효시간 만료 재발급성공");
      next();
      return;
    }

    if (error instanceof NotBeforeError) {
      console.log("토큰 사용 가능 시간이 아직 아닙니다.");
      res.status(401).json({ message: "다시 로그인을 해주세요." });
      res.redirect("/");
      return;
    }

    if (error instanceof JsonWebTokenError) {
      console.log("토큰이 유효하지 않습니다.");
      res.status(403).json({ message: "다시 로그인을 해주세요." });
      res.redirect("/");

      return;
    }

    console.log("인증 중 서버 오류가 발생했습니다.");
    res.status(500).json({ message: "다시 로그인을 해주세요." });
    res.redirect("/");

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
  let accessToken = cookies
    .find((cookie) => cookie.startsWith("jwt="))
    ?.split("=")[1];
  const refreshToken = cookies
    .find((cookie) => cookie.startsWith("refresh="))
    ?.split("=")[1];

  // 5. 검증 끝나면 req.jwtUser에 data 넣어주기

  if (!refreshToken) {
    // 1. refreshToken이 없을때 => 다시 로그인
    console.log("refreshToken 없음");
    next();
    return;
  }
  // 2. refreshToken 검증 trycatch
  try {
    await verifyToken(refreshToken);

    const tokenPattern = /^[A-Za-z0-9-._~+\/]+=*$/;
    if (!tokenPattern.test(refreshToken)) {
      next();
      return;
    }
  } catch (error) {
    errorConsole(error);
    // refreshToken 만료됨
    if (error instanceof TokenExpiredError) {
      console.log("토큰 유효시간 만료");
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

  // 3. accessToken이 없을때 => refreshToken으로 재발급 후 다시 cookie저장
  if (!accessToken) {
    const decoded = verifyToken(refreshToken);

    if (!decoded) {
      errorConsole("refreshToken으로 재발급하다가 실패");
      next();
      return;
    }

    if (typeof decoded === "object" && decoded !== null) {
      const user = decoded as JwtUserDTO;

      // refreshToken으로 재발급
      accessToken = jwt.sign(
        { id: decoded.id },
        `${process.env.JWT_SECRET_KEY}`,
        {
          expiresIn: "1h",
        }
      );

      const tokenData = {
        accessToken,
        refreshToken,
      };

      const jwtData = {
        ...user,
      };

      await setAuthToken(res, tokenData, jwtData);
    } else {
      console.log("decoded가 string임");
      next();
      return;
    }
  }

  // 4. accessToken 검증 trycatch or accessToken있을때
  try {
    // as <== 특정 타입임을 확신
    const user = verifyToken(accessToken) as JwtUserDTO;
    req.jwtUser = user;

    console.log("무조건적회원확인");

    next();
  } catch (error) {
    errorConsole(error);
    if (error instanceof TokenExpiredError) {
      const decoded = verifyToken(refreshToken);

      if (!decoded) {
        errorConsole("refreshToken으로 재발급하다가 실패");
        next();
        return;
      }

      if (typeof decoded === "object" && decoded !== null) {
        const user = decoded as JwtUserDTO;

        // refreshToken으로 재발급
        accessToken = jwt.sign(
          { id: decoded.id },
          `${process.env.JWT_SECRET_KEY}`,
          {
            expiresIn: "1h",
          }
        );

        const tokenData = {
          accessToken,
          refreshToken,
        };

        const jwtData = {
          ...user,
        };

        await setAuthToken(res, tokenData, jwtData);
      } else {
        console.log("decoded가 string임");
        next();
        return;
      }

      console.log("토큰 유효시간 만료 재발급성공");
      next();
      return;
    }

    if (error instanceof NotBeforeError) {
      console.log("토큰 사용 가능 시간이 아직 아닙니다.");
      res.status(401).json({ message: "다시 로그인을 해주세요." });
      res.redirect("/");
      return;
    }

    if (error instanceof JsonWebTokenError) {
      console.log("토큰이 유효하지 않습니다.");
      res.status(403).json({ message: "다시 로그인을 해주세요." });
      res.redirect("/");

      return;
    }

    console.log("인증 중 서버 오류가 발생했습니다.");
    res.status(500).json({ message: "다시 로그인을 해주세요." });
    res.redirect("/");

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
  let accessToken = cookies
    .find((cookie) => cookie.startsWith("jwt="))
    ?.split("=")[1];
  const refreshToken = cookies
    .find((cookie) => cookie.startsWith("refresh="))
    ?.split("=")[1];

  // 5. 검증 끝나면 req.jwtUser에 data 넣어주기

  if (!refreshToken) {
    // 1. refreshToken이 없을때 => 다시 로그인
    console.log("refreshToken 없음");
    res.redirect("/admin");
    return;
  }
  // 2. refreshToken 검증 trycatch
  try {
    await verifyToken(refreshToken);

    const tokenPattern = /^[A-Za-z0-9-._~+\/]+=*$/;
    if (!tokenPattern.test(refreshToken)) {
      res.status(400).json({ message: "잘못된 토큰 형식입니다." });
      res.redirect("/admin");
      return;
    }
  } catch (error) {
    errorConsole(error);
    // refreshToken 만료됨
    if (error instanceof TokenExpiredError) {
      res.status(401).json({ message: "다시 로그인을 해주세요." });
      res.redirect("/admin");
      console.log("토큰 유효시간 만료");
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

  // 3. accessToken이 없을때 => refreshToken으로 재발급 후 다시 cookie저장
  if (!accessToken) {
    const decoded = verifyToken(refreshToken);

    if (!decoded) {
      errorConsole("refreshToken으로 재발급하다가 실패");
      return;
    }

    if (typeof decoded === "object" && decoded !== null) {
      const user = decoded as JwtUserDTO;

      // refreshToken으로 재발급
      accessToken = jwt.sign(
        { id: decoded.id },
        `${process.env.JWT_SECRET_KEY}`,
        {
          expiresIn: "1h",
        }
      );

      const tokenData = {
        accessToken,
        refreshToken,
      };

      const jwtData = {
        ...user,
      };

      await setAuthToken(res, tokenData, jwtData);
    } else {
      throw new Error("Invalid token payload");
    }
  }

  // 4. accessToken 검증 trycatch or accessToken있을때
  try {
    // as <== 특정 타입임을 확신
    const user = verifyToken(accessToken) as JwtUserDTO;

    if (!user.isAdmin) {
      res.status(400).send("관리자 회원이 아닙니다.");
      res.redirect("/admin");
      return;
    }
    req.jwtUser = user;

    console.log("무조건적관리자확인");

    next();
  } catch (error) {
    errorConsole(error);
    if (error instanceof TokenExpiredError) {
      const decoded = verifyToken(refreshToken);

      if (!decoded) {
        errorConsole("refreshToken으로 재발급하다가 실패");
        return;
      }

      if (typeof decoded === "object" && decoded !== null) {
        const user = decoded as JwtUserDTO;

        // refreshToken으로 재발급
        accessToken = jwt.sign(
          { id: decoded.id },
          `${process.env.JWT_SECRET_KEY}`,
          {
            expiresIn: "1h",
          }
        );

        const tokenData = {
          accessToken,
          refreshToken,
        };

        const jwtData = {
          ...user,
        };

        await setAuthToken(res, tokenData, jwtData);
      } else {
        throw new Error("Invalid token payload");
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
  let accessToken = cookies
    .find((cookie) => cookie.startsWith("jwt="))
    ?.split("=")[1];
  const refreshToken = cookies
    .find((cookie) => cookie.startsWith("refresh="))
    ?.split("=")[1];

  // 5. 검증 끝나면 req.jwtUser에 data 넣어주기

  if (!refreshToken) {
    // 1. refreshToken이 없을때 => 다시 로그인
    console.log("refreshToken 없음");
    next();
    return;
  }
  // 2. refreshToken 검증 trycatch
  try {
    await verifyToken(refreshToken);

    const tokenPattern = /^[A-Za-z0-9-._~+\/]+=*$/;
    if (!tokenPattern.test(refreshToken)) {
      console.log("잘못된 토큰 형식입니다.");
      next();
      return;
    }
  } catch (error) {
    errorConsole(error);
    // refreshToken 만료됨
    if (error instanceof TokenExpiredError) {
      console.log("토큰 유효시간 만료");
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

  // 3. accessToken이 없을때 => refreshToken으로 재발급 후 다시 cookie저장
  if (!accessToken) {
    const decoded = verifyToken(refreshToken);

    if (!decoded) {
      errorConsole("refreshToken으로 재발급하다가 실패");
      return;
    }

    if (typeof decoded === "object" && decoded !== null) {
      const user = decoded as JwtUserDTO;

      // refreshToken으로 재발급
      accessToken = jwt.sign(
        { id: decoded.id },
        `${process.env.JWT_SECRET_KEY}`,
        {
          expiresIn: "1h",
        }
      );

      const tokenData = {
        accessToken,
        refreshToken,
      };

      const jwtData = {
        ...user,
      };

      await setAuthToken(res, tokenData, jwtData);
    } else {
      console.log("decoded가 string임");
      next();
      return;
    }
  }

  // 4. accessToken 검증 trycatch or accessToken있을때
  try {
    // as <== 특정 타입임을 확신
    const user = verifyToken(accessToken) as JwtUserDTO;
    if (!user.isAdmin) {
      console.log("관리자 회원이 아닙니다.");
      next();
      return;
    }
    req.jwtUser = user;

    console.log("선택적관리자확인");

    next();
  } catch (error) {
    errorConsole(error);
    if (error instanceof TokenExpiredError) {
      const decoded = verifyToken(refreshToken);

      if (!decoded) {
        errorConsole("refreshToken으로 재발급하다가 실패");
        next();
        return;
      }

      if (typeof decoded === "object" && decoded !== null) {
        const user = decoded as JwtUserDTO;

        // refreshToken으로 재발급
        accessToken = jwt.sign(
          { id: decoded.id },
          `${process.env.JWT_SECRET_KEY}`,
          {
            expiresIn: "1h",
          }
        );

        const tokenData = {
          accessToken,
          refreshToken,
        };

        const jwtData = {
          ...user,
        };

        await setAuthToken(res, tokenData, jwtData);
      } else {
        console.log("decoded가 stringd임");
        next();
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
