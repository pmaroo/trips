import prisma from "../config/db";
import {
  CreatePlace,
  DeletePlace,
  FindPlaceDTO,
  UpdatePlace,
  UpdatePlaceTag,
} from "../types/place";

export const deletePlaceModel = async (data: DeletePlace) => {
  return prisma.place.delete({
    where: { id: parseInt(data.id) },
  });
};

export const updatePlaceTagModel = async (placeData: UpdatePlaceTag) => {
  const tags = placeData.Tag.map((value: { tag: string }) => value.tag);

  return prisma.place.update({
    where: { id: placeData.id },
    data: {
      Tag: {
        connect: tags.map((tag) => ({ tag })), // tag 필드는 unique이므로 가능
      },
    },
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

export const getPlaceModel = async (data: FindPlaceDTO) => {
  return prisma.place.findMany({
    where: { address: { contains: data.address } },
    include: {
      Tag: true,
      Plan: true,
    },
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
