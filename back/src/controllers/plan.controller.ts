import { Request, Response } from "express";
import { errorConsole } from "../utils/error";
import { createPlaceModel, getAllPlaceModel } from "../models/place.model";
import { DeletePlan } from "../types/plan";
import {
  createPlanModel,
  deletePlanModel,
  getPlanByIdModel,
  getPlanUserByIdModel,
  updatePlanModel,
} from "../models/plan.model";
import { PlaceDTO } from "../types/place";

export const deletePlan = async (req: Request, res: Response) => {
  const planData: DeletePlan = req.body;
  try {
    if (!planData) {
      res.status(401).json({ message: "일정의 정보가 없습니다." });
      return;
    }

    const data = await deletePlanModel(planData);
    res.json(data);
  } catch (error) {
    errorConsole(error);
    res.status(401).json({ message: "일정을 삭제하는데 실패했습니다." });
  }
};

export const updatePlan = async (req: Request, res: Response) => {
  const { Place, ...planData } = req.body;
  try {
    if (Array(Place).length === 0 || !planData) {
      res.status(401).json({ message: "일정의 정보가 없습니다." });
      return;
    }

    const result = {
      ...planData,
      User: {
        set: Place.map((place: PlaceDTO) => place),
      },
    };

    const data = await updatePlanModel(result);
    res.json(data);
  } catch (error) {
    errorConsole(error);
    res.status(401).json({ message: "일정을 수정하는데 실패했습니다." });
  }
};

export const createPlan = async (req: Request, res: Response) => {
  const { Place, ...planData } = req.body;
  try {
    if (Array(Place).length === 0 || !planData) {
      res.status(401).json({ message: "일정의 정보가 없습니다." });
      return;
    }

    const result = {
      ...planData,
      User: {
        connect: Place.map((place: PlaceDTO) => place),
      },
    };

    await createPlaceModel(Place);

    const data = await createPlanModel(result);
    res.json(data);
  } catch (error) {
    errorConsole(error);
    res.status(401).json({ message: "일정을 생성하는데 실패했습니다." });
  }
};

export const getPlanUserById = async (req: Request, res: Response) => {
  const planData: DeletePlan = req.body;
  try {
    if (!planData) {
      res.status(401).json({ message: "일정의 정보가 없습니다." });
      return;
    }

    const data = await getPlanUserByIdModel(planData);
    res.json(data);
  } catch (error) {
    errorConsole(error);
    res.status(401).json({ message: "일정을 불러오는데 실패했습니다." });
  }
};

export const getPlanById = async (req: Request, res: Response) => {
  const planData: DeletePlan = req.body;
  try {
    if (!planData) {
      res.status(401).json({ message: "일정의 정보가 없습니다." });
      return;
    }

    const data = await getPlanByIdModel(planData);
    res.json(data);
  } catch (error) {
    errorConsole(error);
    res.status(401).json({ message: "일정을 불러오는데 실패했습니다." });
  }
};

export const getAllPlan = async (req: Request, res: Response) => {
  try {
    const data = await getAllPlaceModel();
    res.json(data);
  } catch (error) {
    errorConsole(error);
    res.status(401).json({ messgae: "일정을 불러오는데 실패했습니다." });
  }
};
