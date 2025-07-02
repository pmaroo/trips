import { NextFunction, Request, Response } from "express";
import { AppError, errorConsole } from "../utils/error";
import {
  createPlaceModel,
  deletePlaceModel,
  getAllPlaceModel,
  getPlaceModel,
  updatePlaceModel,
  updatePlaceTagModel,
} from "../models/place.model";
import { TagDTO } from "../types/tag";
import { DeletePlace } from "../types/place";

export const createTagPlus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { placeData } = req.body;

  try {
    if (!placeData) {
      throw new Error("장소 정보가 없습니다.");
    }

    const data = await updatePlaceTagModel(placeData);
    res.json(data);
  } catch (error) {
    errorConsole(error);
    next(new AppError(401, "태그를 추가하는데 실패했습니다.", { raw: error }));
  }
};

export const deletePlace = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const deleteData: DeletePlace = req.body;

  try {
    if (!deleteData) {
      throw new Error("장소 정보가 없습니다.");
    }

    const data = await deletePlaceModel(deleteData);
    res.json(data);
  } catch (error) {
    errorConsole(error);
    next(new AppError(401, "태그를 삭제에 실패했습니다.", { raw: error }));
  }
};

export const updatePlace = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { placeData } = req.body;

  try {
    if (!placeData) {
      throw new Error("장소 정보가 없습니다.");
    }
    const result = {
      ...placeData,
      Tag: {
        connect: placeData.Tag?.map((tag: TagDTO) => tag),
      },
    };
    const data = await updatePlaceModel(result);
    res.json(data);
  } catch (error) {
    errorConsole(error);
    next(new AppError(401, "태그를 수정에 실패했습니다.", { raw: error }));
  }
};

export const createPlace = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { placeData } = req.body;

  try {
    if (!placeData) {
      throw new Error("장소 정보가 없습니다.");
    }

    const result = {
      ...placeData,
      Tag: {
        connect: placeData.Tag,
      },
    };

    const data = await createPlaceModel(result);
    res.json(data);
  } catch (error) {
    errorConsole(error);
    next(new AppError(401, "태그를 생성에 실패했습니다.", { raw: error }));
  }
};

export const getAllPlace = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getAllPlaceModel();
    res.json(data);
  } catch (error) {
    errorConsole(error);
    next(new AppError(401, "태그를 불러오는데 실패했습니다.", { raw: error }));
  }
};

export const getPlace = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { address } = req.body;

  try {
    const data = await getPlaceModel(address);
    res.json(data);
  } catch (error) {
    errorConsole(error);
    next(new AppError(401, "태그를 불러오는데 실패했습니다.", { raw: error }));
  }
};
