import prisma from "../config/db";
import {
  CreatePlace,
  DeletePlace,
  UpdatePlace,
  UpdatePlaceTag,
} from "../types/place";

type PlaceUpdateInput = Parameters<typeof prisma.place.update>[0]["data"];

export const deletePlaceModel = async (data: DeletePlace) => {
  return prisma.place.delete({
    where: { id: data.id },
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

export const getAllPlaceModel = async () => {
  return prisma.place.findMany({
    include: {
      Tag: true,
      Plan: true,
    },
  });
};
