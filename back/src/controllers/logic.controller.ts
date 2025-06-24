import { NextFunction, Request, Response } from "express";
import { AppError, errorConsole } from "../utils/error";
import { logic } from "../service/logic.service";
import { createPlanModel, updatePlanModel } from "../models/plan.model";
import { findPlaceKakao, updateDataLogic } from "../service/place.service";
import { CreatePlan } from "../types/plan";

export const updatePlan = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data: CreatePlan = req.body;
  try {
    if (!data) {
      res.status(401).json({ message: "일정의 정보가 없습니다." });
      throw new Error("일정의 정보가 없습니다.");
    }

    const result: CreatePlan = await updateDataLogic(data);
    await updatePlanModel(result);
    res.json(result);
  } catch (error) {
    errorConsole(error);
    next(new AppError(401, "일정을 수정하는데 실패했습니다.", { raw: error }));
  }
};

export const findPlace = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data: { keyword: string } = req.body;
  try {
    if (!data) {
      res.status(401).json({ message: "일정의 정보가 없습니다." });
      throw new Error("일정의 정보가 없습니다.");
    }

    const result = await findPlaceKakao(data);

    res.json(result);
  } catch (error) {
    errorConsole(error);

    next(new AppError(401, "장소를 찾는데 실패했습니다.", { raw: error }));
  }
};

export const findLogic = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data: any = req.body;
  try {
    if (!data) {
      res.status(401).json({ message: "일정의 정보가 없습니다." });
      throw new Error("일정의 정보가 없습니다.");
    }

    const logicResult = await logic(data);
    const result = await createPlanModel(logicResult);
    res.json(result);
  } catch (error) {
    errorConsole(error);
    next(new AppError(401, "일정을 계획하는데 실패했습니다.", { raw: error }));
  }
};
