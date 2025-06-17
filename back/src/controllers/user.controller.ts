import { Request, Response } from "express";
import {
  createUserModel,
  emailCheckModel,
  exitUserModel,
  getAllUsersModel,
  getUserByIdModel,
  logoutModel,
  refreshTokenModel,
  updateUserModel,
} from "../models/user.model";
import { errorConsole } from "../utils/error";
import {
  AdminLoginUser,
  CreateUser,
  ExitUser,
  JwtUserDTO,
  LoginUser,
  LogoutUser,
  UpdateUser,
} from "../types/user";
import { PrismaClientKnownRequestError } from "../generated/prisma/runtime/library";
import bcrypt from "bcrypt";
import { generateToken } from "../service/jwt.service";
import { LocalStorage } from "node-localstorage";
import { login } from "../service/login.service";
import { setAuthToken } from "../utils/token";

export const logoutUser = async (req: Request, res: Response) => {
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
    res.status(401).json({ message: "로그아웃 할 수 없습니다." });
  }
};

export const adminLoginUser = async (req: Request, res: Response) => {
  const loginData: AdminLoginUser = req.body;

  try {
    if (!loginData) {
      res.status(404).json({ message: "회원 정보가 없습니다." });
      return;
    }

    const jwtData = await login(loginData);

    // 에러문구인지 판별
    if (typeof jwtData === "string") {
      res.status(401).json({ message: jwtData });
      return;
    }

    // 관리자 회원인지 판별
    if (!jwtData.isAdmin) {
      res.status(401).json({ message: "접근 권한이 없는 계정입니다." });
      return;
    }

    // 토큰발급
    const toeknData = await generateToken(jwtData);

    // 토큰 쿠키 및 DB 저장
    const data = await setAuthToken(res, toeknData, jwtData);

    res.json(data);
  } catch (error) {
    errorConsole(error);
    res.status(401).json({ message: "로그인 할 수 없습니다." });
  }
};

export const loginUserController = async (req: Request, res: Response) => {
  const loginData: CreateUser = req.body;

  try {
    if (!loginData) {
      res.status(404).json({ message: "회원 정보가 없습니다." });
      return;
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
    res.status(401).json({ message: "로그인 할 수 없습니다." });
  }
};

export const exitUser = async (req: Request, res: Response) => {
  const exitData: ExitUser = req.body;

  try {
    if (!exitData) {
      res.status(404).json({ message: "회원 정보가 없습니다." });
      return;
    }

    const data = await exitUserModel(exitData);
    res.json(data);
  } catch (error) {
    errorConsole(error);
    res.status(401).json({ message: "회원탈퇴에 실패했습니다." });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const updateData: UpdateUser = req.body;

  try {
    if (!updateData) {
      res.status(404).json({ message: "회원 정보가 없습니다." });
      return;
    }

    const data = await updateUserModel(updateData);
    res.json(data);
  } catch (error) {
    errorConsole(error);
    res.status(401).json({ message: "회원수정에 실패했습니다." });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const createData: CreateUser = req.body;

  try {
    if (!createData) {
      res.status(404).json({ message: "회원 정보가 없습니다." });
      return;
    }

    const data = await createUserModel(createData);

    res.json(data);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      // Prisma 오류 코드 처리
      if (error.code === "P2002") {
        // Unique constraint violation (예: 이메일 중복)
        if (error.meta?.target === "User_email_key") {
          res.status(400).json({
            message:
              "이미 사용 중인 이메일입니다. 다른 이메일을 사용해주세요3.",
          });
          return;
        }
      }
      // 기타 Prisma 에러 처리
      res.status(500).json({ message: "데이터베이스 오류가 발생했습니다." });

      return;
    }

    res.status(401).json({ message: "회원가입에 실패했습니다." });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const userId = parseInt(id);

    // express는 응답을 return이 아닌 res 객체를 통해 응답을 보내는 방식
    // return res.status() 해버리면 undefined를 반환하는 거지만
    // Response로 반환한다고 해석
    if (!userId) {
      res.status(404).json({ message: "id가 없습니다." });
      return;
    }
    const data = await getUserByIdModel(userId);
    res.json(data);
  } catch (error) {
    errorConsole(error);
    res.status(401).json({ message: "회원 조회에 실패했습니다." });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  const { isAdmin } = req.body;

  try {
    const data = await getAllUsersModel(isAdmin);

    res.json(data);
  } catch (error) {
    errorConsole(error);
    res.status(401).json({ message: "회원 조회에 실패했습니다." });
  }
};
