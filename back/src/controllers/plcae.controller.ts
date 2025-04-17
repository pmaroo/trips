import { Request, Response } from "express";
import { errorConsole } from "../utils/error";
import {
  createPlaceModel,
  deletePlaceModel,
  getAllPlaceModel,
  updatePlaceModel,
} from "../models/place.model";
import { TagDTO } from "../types/tag";
import { DeletePlace } from "../types/place";

export const deletePlace = async (req: Request, res: Response) => {
  const deleteData: DeletePlace = req.body;

  try {
    if (!deleteData) {
      res.status(401).json({ message: "장소 정보가 없습니다." });
      return;
    }

    const data = await deletePlaceModel(deleteData);
    res.json(data);
  } catch (error) {
    errorConsole(error);
    res.status(401).json({ message: "장소 삭제에 실패했습니다." });
  }
};

export const updatePlace = async (req: Request, res: Response) => {
  const { Tag, ...placeData } = req.body;

  try {
    if (!placeData) {
      res.status(401).json({ message: "장소 정보가 없습니다." });
      return;
    }

    const result = {
      ...placeData,
      Tag: {
        set: Tag.map((tag: TagDTO) => tag),
      },
    };

    const data = await updatePlaceModel(result);
    res.json(data);
  } catch (error) {
    errorConsole(error);
    res.status(401).json({ message: "장소 수정에 실패했습니다." });
  }
};

export const createPlace = async (req: Request, res: Response) => {
  const { Tag, ...placeData } = req.body;

  try {
    if (!placeData) {
      res.status(401).json({ message: "장소 정보가 없습니다." });
      return;
    }

    const result = {
      ...placeData,
      Tag: {
        connect: Tag.map((tag: TagDTO) => tag),
      },
    };

    const data = await createPlaceModel(result);
    res.json(data);
  } catch (error) {
    errorConsole(error);
    res.status(401).json({ message: "장소 생성에 실패했습니다." });
  }
};

export const getAllPlace = async (req: Request, res: Response) => {
  try {
    const data = await getAllPlaceModel();
    res.json(data);
  } catch (error) {
    errorConsole(error);
    res.status(401).json({ message: "장소를 불러오는데 실패했습니다." });
  }
};
