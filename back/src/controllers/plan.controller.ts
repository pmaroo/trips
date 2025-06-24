import { NextFunction, Request, Response } from "express";
import { AppError, errorConsole } from "../utils/error";
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

export const deletePlan = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const planData: DeletePlan = req.body;
  try {
    if (!planData) {
      throw new Error("일정의 정보가 없습니다.");
    }

    const data = await deletePlanModel(planData);
    res.json(data);
  } catch (error) {
    errorConsole(error);

    next(new AppError(401, "일정을 삭제하는데 실패했습니다.", { raw: error }));
  }
};

export const updatePlan = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { Place, ...planData } = req.body;
  try {
    if (Array(Place).length === 0 || !planData) {
      throw new Error("일정의 정보가 없습니다.");
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
    next(new AppError(401, "일정을 수정하는데 실패했습니다.", { raw: error }));
  }
};

export const createPlan = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { Place, ...planData } = req.body;
  try {
    if (Array(Place).length === 0 || !planData) {
      throw new Error("일정의 정보가 없습니다.");
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
    next(new AppError(401, "일정을 생성하는데 실패했습니다.", { raw: error }));
  }
};

export const getPlanUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const planData: DeletePlan = req.body;
  try {
    if (!planData) {
      throw new Error("일정의 정보가 없습니다.");
    }

    const data = await getPlanUserByIdModel(planData);
    res.json(data);
  } catch (error) {
    errorConsole(error);
    next(new AppError(401, "일정을 불러오는데 실패했습니다.", { raw: error }));
  }
};

export const getPlanById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const planData: DeletePlan = req.body;
  try {
    if (!planData) {
      throw new Error("일정의 정보가 없습니다.");
    }

    const data = await getPlanByIdModel(planData);
    res.json(data);
  } catch (error) {
    errorConsole(error);
    next(new AppError(401, "일정을 불러오는데 실패했습니다.", { raw: error }));
  }
};

export const getAllPlan = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getAllPlaceModel();
    res.json(data);
  } catch (error) {
    errorConsole(error);
    next(new AppError(401, "일정을 불러오는데 실패했습니다.", { raw: error }));
  }
};
