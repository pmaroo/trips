import { NextFunction, Request, Response } from "express";
import { AppError, errorConsole } from "../utils/error";
import {
  createTagModel,
  deleteTagModel,
  getAllTagModel,
  getPlaceTagByIdModel,
  updateTagModel,
} from "../models/tag.model";
import { DeleteTag } from "../types/tag";

export const deleteTag = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const deleteData: DeleteTag = req.body;

  try {
    if (!deleteData) {
      throw new Error("태그 정보가 없습니다.");
    }

    const verify = await getPlaceTagByIdModel(deleteData);
    if (verify.length !== 0) {
      throw new Error("태그를 가지고 있는 장소가 있어 삭제가 불가합니다.");
    }

    const data = await deleteTagModel(deleteData);
    res.json(data);
  } catch (error) {
    errorConsole(error);

    next(new AppError(401, "태그를 삭제하는데 실패했습니다.", { raw: error }));
  }
};

export const updateTag = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { tagData } = req.body;
  try {
    if (!tagData) {
      throw new Error("태그 정보가 없습니다.");
    }

    const data = await updateTagModel(tagData);
    res.json(data);
  } catch (error) {
    errorConsole(error);

    next(new AppError(401, "태그를 수정하는데 실패했습니다.", { raw: error }));
  }
};

export const createTag = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { tagData } = req.body;
  try {
    if (!tagData) {
      throw new Error("태그 정보가 없습니다.");
    }

    const data = await createTagModel(tagData);
    res.json(data);
  } catch (error) {
    errorConsole(error);

    next(new AppError(401, "태그를 생성하는데 실패했습니다.", { raw: error }));
  }
};

export const getAllTag = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getAllTagModel();
    res.json(data);
  } catch (error) {
    errorConsole(error);

    next(new AppError(401, "태그를 불러오는데 실패했습니다.", { raw: error }));
  }
};
