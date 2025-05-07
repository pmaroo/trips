import { emailCheckModel } from "../models/user.model";
import bcrypt from "bcrypt";
import { JwtUserDTO, LoginUser } from "../types/user";

export const login = async (loginData: LoginUser) => {
  // 이메일체크
  const emailCheck = await emailCheckModel(loginData.email);
  if (!emailCheck) {
    const message = "일치하는 회원이 없습니다.";
    return message;
  }

  // 비밀번호체크
  const data = await bcrypt.compare(loginData.password, emailCheck.password);
  if (!data) {
    const message = "이메일 혹은 비밀번호가 일치하지 않습니다.";
    return message;
  }

  const jwtData: JwtUserDTO = {
    id: emailCheck.id,
    email: emailCheck.email,
    userName: emailCheck.userName,
    nickName: emailCheck.nickName,
    isAdmin: emailCheck.isAdmin,
  };

  return jwtData;
};
