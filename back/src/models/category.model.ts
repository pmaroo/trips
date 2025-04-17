import prisma from "../config/db";
import {
  CreateCategory,
  DeleteCategory,
  UpdateCategory,
} from "../types/category";

export const deleteCategoryModel = async (data: DeleteCategory) => {
  return prisma.category.delete({
    where: { id: data.id },
  });
};

export const updateCategoryModel = async (data: UpdateCategory) => {
  return prisma.category.update({
    where: { id: data.id },
    data,
  });
};

export const createCategoryModel = async (data: CreateCategory) => {
  return prisma.category.create({
    data,
  });
};

export const getPlanCategoryByIdModel = async (data: DeleteCategory) => {
  return prisma.plan.findMany({
    where: { id: data.id },
  });
};

export const getAllCategoryModel = async () => {
  return prisma.category.findMany({
    include: {
      Tag: true,
      Plan: true,
    },
  });
};
