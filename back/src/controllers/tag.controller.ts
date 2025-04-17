import { Request, Response } from "express";
import { errorConsole } from "../utils/error";
import {
  createTagModel,
  deleteTagModel,
  getAllTagModel,
  getPlaceTagByIdModel,
  updateTagModel,
} from "../models/tag.model";
import { CategoryDTO } from "../types/category";
import { DeleteTag } from "../types/tag";

export const deleteTag = async (req: Request, res: Response) => {
  const deleteData: DeleteTag = req.body;
  try {
    if (!deleteData) {
      res.status(401).json({ message: "태그 정보가 없습니다." });
      return;
    }

    const verify = await getPlaceTagByIdModel(deleteData);
    if (verify.length !== 0) {
      res
        .status(401)
        .json({ message: "태그를 가지고 있는 장소가 있어 삭제가 불가합니다." });
      return;
    }

    const data = await deleteTagModel(deleteData);
    res.json(data);
  } catch (error) {
    errorConsole(error);
    res.status(401).json({
      message: "태그를 삭제하는데 실패했습니다.",
    });
  }
};

export const updateTag = async (req: Request, res: Response) => {
  const { Category, ...tagData } = req.body;
  try {
    if (!tagData || Array(Category).length === 0) {
      res.status(401).json({ message: "태그 정보가 없습니다." });
      return;
    }

    const result = {
      ...tagData,
      Category: {
        set: Category.map((cate: CategoryDTO) => cate),
      },
    };

    const data = await updateTagModel(result);
    res.json(data);
  } catch (error) {
    errorConsole(error);
    res.status(401).json({
      message: "태그를 수정하는데 실패했습니다.",
    });
  }
};

export const createTag = async (req: Request, res: Response) => {
  const { Category, ...tagData } = req.body;
  try {
    if (!tagData || Array(Category).length === 0) {
      res.status(401).json({ message: "태그 정보가 없습니다." });
      return;
    }

    const result = {
      ...tagData,
      Category: {
        connect: Category.map((cate: CategoryDTO) => cate),
      },
    };

    const data = await createTagModel(result);
    res.json(data);
  } catch (error) {
    errorConsole(error);
    res.status(401).json({
      message: "태그를 생성하는데 실패했습니다.",
    });
  }
};

export const getAllTag = async (req: Request, res: Response) => {
  try {
    const data = await getAllTagModel();
    res.json(data);
  } catch (error) {
    errorConsole(error);
    res.status(401).json({ message: "태그를 불러오는데 실패했습니다." });
  }
};
