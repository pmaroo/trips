import { Request, Response } from "express";
import { errorConsole } from "../utils/error";
import {
  createCategoryModel,
  deleteCategoryModel,
  getAllCategoryModel,
  getPlanCategoryByIdModel,
  updateCategoryModel,
} from "../models/category.model";
import { TagDTO } from "../types/tag";
import { DeleteCategory } from "../types/category";

export const deleteCategory = async (req: Request, res: Response) => {
  const deleteData: DeleteCategory = req.body;
  try {
    if (!deleteData) {
      res.status(401).json({ message: "카테고리 정보가 없습니다." });
      return;
    }

    const verify = await getPlanCategoryByIdModel(deleteData);
    if (verify.length !== 0) {
      res.status(401).json({
        message: "카테고리를 가지고 있는 일정이 있어 삭제가 불가합니다.",
      });
      return;
    }

    const data = await deleteCategoryModel(deleteData);
    res.json(data);
  } catch (error) {
    errorConsole(error);
    res.status(401).json({
      message: "카테고리를 삭제하는데 실패했습니다.",
    });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const { categoryData } = req.body;

  try {
    if (!categoryData) {
      res.status(401).json({ message: "카테고리 정보가 없습니다." });
      return;
    }

    const data = await updateCategoryModel(categoryData);
    res.json(data);
  } catch (error) {
    errorConsole(error);
    res.status(401).json({ message: "카테고리를 수정하는데 실패했습니다." });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  const { categoryData } = req.body;

  try {
    if (!categoryData) {
      res.status(401).json({ message: "카테고리 정보가 없습니다." });
      return;
    }

    const data = await createCategoryModel(categoryData);
    res.json(data);
  } catch (error) {
    errorConsole(error);
    res.status(401).json({ message: "카테고리를 생성하는데 실패했습니다." });
  }
};

export const getAllCategory = async (req: Request, res: Response) => {
  try {
    const data = await getAllCategoryModel();
    res.json(data);
  } catch (error) {
    errorConsole(error);
    res.status(401).json({ message: "카테고리를 조회하는데 실패했습니다." });
  }
};
