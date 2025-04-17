import prisma from "../config/db";
import { CreatePlan, DeletePlan, PlanDTO, UpdatePlan } from "../types/plan";

export const deletePlanModel = async (data: DeletePlan) => {
  return prisma.plan.delete({
    where: { id: data.id },
  });
};

export const updatePlanModel = async (data: UpdatePlan) => {
  return prisma.plan.update({
    where: { id: data.id },
    data,
  });
};

export const createPlanModel = async (data: CreatePlan) => {
  return prisma.plan.create({
    data,
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
