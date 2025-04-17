import prisma from "../config/db";
import { CreatePlace, DeletePlace, UpdatePlace } from "../types/place";

export const deletePlaceModel = async (data: DeletePlace) => {
  return prisma.place.delete({
    where: { id: data.id },
  });
};

export const updatePlaceModel = async (data: UpdatePlace) => {
  return prisma.place.update({
    where: { id: data.id },
    data,
  });
};

export const createPlaceModel = async (data: CreatePlace) => {
  return prisma.place.create({
    data,
  });
};

export const getAllPlaceModel = async () => {
  return prisma.place.findMany({
    include: {
      Tag: true,
      Plan: true,
    },
  });
};
