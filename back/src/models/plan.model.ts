import prisma from "../config/db";
import { Prisma } from "../generated/prisma";
import { CreatePlan, DeletePlan, PlanDTO, UpdatePlan } from "../types/plan";

export const deletePlanModel = async (data: DeletePlan) => {
  return prisma.plan.delete({
    where: { id: data.id },
  });
};

export const updatePlanModel = async (data: CreatePlan) => {
  const destination: Prisma.JsonObject = {
    lat: data.destination.lat,
    lng: data.destination.lng,
    name: data.destination.name,
  };
  const start: Prisma.JsonObject = {
    lat: data.start.lat,
    lng: data.start.lng,
    name: data.start.name,
  };

  const date: Prisma.JsonArray = data.date.map((value) => ({
    ...value,
  })) as Prisma.JsonArray;

  const days: Prisma.JsonArray = data.days.map((dayArray) =>
    dayArray.map((place) => ({ ...place }))
  ) as Prisma.JsonArray;

  return prisma.plan.update({
    where: { id: data.id },
    data: {
      UserId: 1,
      CategoryId: data.CategoryId,
      destination,
      start,
      date,
      days,
      originDate: data.originDate,
      traffic: data.traffic,
      category: data.category,
    },
  });
};

export const createPlanModel = async (data: CreatePlan) => {
  const destination: Prisma.JsonObject = {
    lat: data.destination.lat,
    lng: data.destination.lng,
    name: data.destination.name,
  };
  const start: Prisma.JsonObject = {
    lat: data.start.lat,
    lng: data.start.lng,
    name: data.start.name,
  };

  const date: Prisma.JsonArray = data.date.map((value) => ({
    ...value,
  })) as Prisma.JsonArray;

  const days: Prisma.JsonArray = data.days.map((dayArray) =>
    dayArray.map((place) => ({ ...place }))
  ) as Prisma.JsonArray;

  return prisma.plan.create({
    data: {
      UserId: data.UserId,
      CategoryId: data.CategoryId,
      destination,
      start,
      date,
      days,
      originDate: data.originDate,
      traffic: data.traffic,
      category: data.category,
    },
  });
};

export const getPlanUserByIdModel = async (data: DeletePlan) => {
  return prisma.plan.findMany({
    where: { UserId: data.id },
  });
};

export const getPlacePlanByIdModel = async (data: DeletePlan) => {
  return prisma.place.findMany({
    where: { id: data.id },
  });
};

export const getPlanByIdModel = async (data: DeletePlan) => {
  return prisma.plan.findUnique({
    where: { id: data.id },
    include: {
      Place: true,
      User: true,
      Category: true,
    },
  });
};

export const getAllPlanModel = async () => {
  return prisma.plan.findMany({
    include: {
      Place: true,
      User: true,
      Category: true,
    },
  });
};
