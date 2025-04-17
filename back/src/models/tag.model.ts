import prisma from "../config/db";
import { CreateTag, DeleteTag, UpdateTag } from "../types/tag";

export const deleteTagModel = async (data: DeleteTag) => {
  return prisma.tag.delete({
    where: { id: data.id },
  });
};

export const updateTagModel = async (data: UpdateTag) => {
  return prisma.tag.update({
    where: { id: data.id },
    data,
  });
};

export const createTagModel = async (data: CreateTag) => {
  return prisma.tag.create({
    data,
  });
};

export const getPlaceTagByIdModel = async (data: DeleteTag) => {
  return prisma.place.findMany({
    where: {
      Tag: {
        some: {
          id: data.id,
        },
      },
    },
  });
};

export const getAllTagModel = async () => {
  return prisma.tag.findMany({
    include: {
      Category: true,
      Place: true,
    },
  });
};
