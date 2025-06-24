import { NextFunction, Request, Response } from "express";
import {
  createUserModel,
  exitUserModel,
  getAllUsersModel,
  getUserByIdModel,
  logoutModel,
  updateUserModel,
} from "../models/user.model";
import { AppError, errorConsole } from "../utils/error";
import {
  AdminLoginUser,
  CreateUser,
  ExitUser,
  JwtUserDTO,
  LogoutUser,
  UpdateUser,
} from "../types/user";
import { PrismaClientKnownRequestError } from "../generated/prisma/runtime/library";
import { generateToken } from "../service/jwt.service";
import { login } from "../service/login.service";
import { setAuthToken } from "../utils/token";

export const logoutUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const logoutData: LogoutUser = req.body;

  // 쿠키 삭제
  await res.clearCookie("jwt", {
    httpOnly: true, // HTTP Only 쿠키
    secure: process.env.NODE_ENV === "production", // HTTPS 환경에서만 적용
    sameSite: "lax", // SameSite 옵션 설정
  });

  await res.clearCookie("refresh", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  try {
    const data = await logoutModel(logoutData);

    res.json(data);
  } catch (error) {
    errorConsole(error);

    next(new AppError(401, "로그아웃 할 수 없습니다.", { raw: error }));
  }
};

export const adminLoginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const loginData: AdminLoginUser = req.body;

  try {
    if (!loginData) {
      throw new Error("회원 정보가 없습니다.");
    }

    const jwtData = await login(loginData);

    // 에러문구인지 판별
    if (typeof jwtData === "string") {
      throw new Error(jwtData);
    }

    // 관리자 회원인지 판별
    if (!jwtData.isAdmin) {
      throw new Error("접근 권한이 없는 계정입니다.");
    }

    // 토큰발급
    const toeknData = await generateToken(jwtData);

    // 토큰 쿠키 및 DB 저장
    const data = await setAuthToken(res, toeknData, jwtData);

    res.json(data);
  } catch (error) {
    errorConsole(error);
    next(new AppError(401, "로그인 할 수 없습니다.", { raw: error }));
  }
};

export const loginUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const loginData: CreateUser = req.body;

  try {
    if (!loginData) {
      throw new Error("회원 정보가 없습니다.");
    }

    if (!req.jwtUser) {
      return;
    }

    const jwtData: JwtUserDTO = req.jwtUser;

    // 토큰발급
    const toeknData = await generateToken(jwtData);

    // 토큰 쿠키 및 DB 저장
    const data = await setAuthToken(res, toeknData, jwtData);

    res.json(data);
  } catch (error) {
    errorConsole(error);
    next(new AppError(401, "로그인 할 수 없습니다.", { raw: error }));
  }
};

export const exitUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const exitData: ExitUser = req.body;

  try {
    if (!exitData) {
      throw new Error("회원 정보가 없습니다.");
    }

    const data = await exitUserModel(exitData);
    res.json(data);
  } catch (error) {
    errorConsole(error);
    next(new AppError(401, "회원탈퇴에 실패했습니다.", { raw: error }));
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const updateData: UpdateUser = req.body;

  try {
    if (!updateData) {
      throw new Error("회원 정보가 없습니다.");
    }

    const data = await updateUserModel(updateData);
    res.json(data);
  } catch (error) {
    errorConsole(error);
    next(new AppError(401, "회원수정에 실패했습니다.", { raw: error }));
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const createData: CreateUser = req.body;

  try {
    if (!createData) {
      throw new Error("회원 정보가 없습니다.");
    }

    const data = await createUserModel(createData);

    res.json(data);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      // Prisma 오류 코드 처리
      if (error.code === "P2002") {
        // Unique constraint violation (예: 이메일 중복)
        if (error.meta?.target === "User_email_key") {
          throw new Error(
            "이미 사용 중인 이메일입니다. 다른 이메일을 사용해주세요."
          );
        }
      }
      // 기타 Prisma 에러 처리

      throw new Error("데이터베이스 오류가 발생했습니다.");
    }

    next(new AppError(401, "회원가입에 실패했습니다.", { raw: error }));
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const userId = parseInt(id);

    // express는 응답을 return이 아닌 res 객체를 통해 응답을 보내는 방식
    // return res.status() 해버리면 undefined를 반환하는 거지만
    // Response로 반환한다고 해석
    if (!userId) {
      throw new Error("id가 없습니다.");
    }
    const data = await getUserByIdModel(userId);
    res.json(data);
  } catch (error) {
    errorConsole(error);
    next(new AppError(401, "회원 조회에 실패했습니다.", { raw: error }));
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { isAdmin } = req.body;

  try {
    const data = await getAllUsersModel(isAdmin);

    res.json(data);
  } catch (error) {
    errorConsole(error);
    next(new AppError(401, "회원 조회에 실패했습니다.", { raw: error }));
  }
};
