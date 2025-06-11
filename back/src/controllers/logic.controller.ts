import { Request, Response } from "express";
import { errorConsole } from "../utils/error";
import { logic } from "../service/logic.service";
import { createPlanModel } from "../models/plan.model";
import { findPlaceGoogle } from "../service/place.service";

export const findPlace = async (req: Request, res: Response) => {
  const data: { keyword: string } = req.body;
  try {
    if (!data) {
      res.status(401).json({ message: "일정의 정보가 없습니다." });
      return;
    }

    const result = await findPlaceGoogle(data);

    res.json(result);
  } catch (error) {
    errorConsole(error);
    res.status(401).json({ message: "일정을 계획하는데 실패했습니다." });
  }
};

export const findLogic = async (req: Request, res: Response) => {
  const data: any = req.body;
  try {
    if (!data) {
      res.status(401).json({ message: "일정의 정보가 없습니다." });
      return;
    }

    const logicResult = await logic(data);
    const result = await createPlanModel(logicResult);
    res.json({ result: true });
  } catch (error) {
    errorConsole(error);
    res.status(401).json({ message: "일정을 계획하는데 실패했습니다." });
  }
};
