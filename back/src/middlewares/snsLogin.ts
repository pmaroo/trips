import { createUserModel, emailCheckModel } from "../models/user.model";
import bcrypt from "bcrypt";
import { CreateUser, JwtUserDTO, LoginUser } from "../types/user";
import { NextFunction, Request, Response } from "express";

export const snsLoginMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const loginData: CreateUser = req.body;

  // 이메일체크
  const emailCheck = await emailCheckModel(loginData.email);

  if (!emailCheck) {
    // 일치하는 회원이 없으면 회원가입처리
    const result = await createUserModel(loginData);

    if (result) {
      // 회원가입 후 다음으로
      const jwtData: JwtUserDTO = {
        id: result.id,
        email: result.email,
        userName: result.userName,
        nickName: result.nickName,
        isAdmin: result.isAdmin,
      };

      req.jwtUser = jwtData;

      next();
    }

    const message = "회원가입에 실패했습니다.";
    res.status(200).send(message);

    return;
  }

  // 일치하는 회원이 있다면 형식적인 로그인절차
  const data = await bcrypt.compare(emailCheck.email, emailCheck.password);

  //   안맞을리 없지만 형식적인 로그인 절차
  if (!data) {
    const message = "이메일 혹은 비밀번호가 일치하지 않습니다.";
    res.status(200).send(message);
    return;
  }

  next();
};
