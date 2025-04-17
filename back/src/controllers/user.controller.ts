import { Request, Response } from "express";
import {
  createUserModel,
  exitUserModel,
  getAllUsersModel,
  getUserByIdModel,
  updateUserModel,
} from "../models/user.model";
import { errorConsole } from "../utils/error";
import { CreateUser, ExitUser, UpdateUser } from "../types/user";

export const exitUser = async (req: Request, res: Response) => {
  const exitData: ExitUser = req.body;

  try {
    if (!exitData) {
      res.status(404).json({ message: "회원 정보가 없습니다." });
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
    errorConsole(error);
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
  try {
    const data = await getAllUsersModel();
    res.json(data);
  } catch (error) {
    errorConsole(error);
    res.status(401).json({ message: "회원 조회에 실패했습니다." });
  }
};
