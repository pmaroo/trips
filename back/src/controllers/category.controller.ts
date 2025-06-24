import { Request, Response, NextFunction } from "express";
import { AppError, errorConsole } from "../utils/error";
import {
  createCategoryModel,
  deleteCategoryModel,
  getAllCategoryModel,
  getPlanCategoryByIdModel,
  updateCategoryModel,
} from "../models/category.model";
import { DeleteCategory } from "../types/category";

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const deleteData: DeleteCategory = req.body;
  try {
    if (!deleteData) {
      throw new Error("카테고리 정보가 없습니다.");
    }

    const verify = await getPlanCategoryByIdModel(deleteData);
    if (verify.length !== 0) {
      throw new Error("카테고리를 가지고 있는 일정이 있어 삭제가 불가합니다.");
    }

    const data = await deleteCategoryModel(deleteData);
    res.json(data);
  } catch (error) {
    errorConsole(error);

    next(
      new AppError(401, "카테고리를 삭제하는데 실패했습니다.", { raw: error })
    );
  }
};

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { categoryData } = req.body;

  try {
    if (!categoryData) {
      throw new Error("카테고리 정보가 없습니다.");
    }

    const data = await updateCategoryModel(categoryData);
    res.json(data);
  } catch (error) {
    errorConsole(error);
    next(
      new AppError(401, "카테고리를 수정하는데 실패했습니다.", { raw: error })
    );
  }
};

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { categoryData } = req.body;

  try {
    if (!categoryData) {
      throw new Error("카테고리 정보가 없습니다.");
    }

    const data = await createCategoryModel(categoryData);
    res.json(data);
  } catch (error) {
    errorConsole(error);
    next(
      new AppError(401, "카테고리를 생성하는데 실패했습니다.", { raw: error })
    );
  }
};

export const getAllCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getAllCategoryModel();
    res.json(data);
  } catch (error) {
    errorConsole(error);
    next(
      new AppError(401, "카테고리를 조회하는데 실패했습니다.", { raw: error })
    );
  }
};
