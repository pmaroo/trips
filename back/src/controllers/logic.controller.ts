import { Request, Response } from "express";
import { errorConsole } from "../utils/error";
import { ItineraryInput } from "../types/logic";
import { logic } from "../service/logic.service";

export const findLogic = async (req: Request, res: Response) => {
  const data: any = req.body;
  try {
    if (!data) {
      res.status(401).json({ message: "일정의 정보가 없습니다." });
      return;
    }

    const result = await logic(data);
    res.json(result);
  } catch (error) {
    errorConsole(error);
    res.status(401).json({ message: "일정을 계획하는데 실패했습니다." });
  }
};
