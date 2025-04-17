import prisma from "../config/db";
import { CreateUser, ExitUser, UpdateUser } from "../types/user";

export const exitUserModel = async (data: ExitUser) => {
  return prisma.user.update({
    where: { id: data.id },
    data: { ...data },
  });
};

export const updateUserModel = async (data: UpdateUser) => {
  return prisma.user.update({
    where: { id: data.id },
    data,
  });
};

export const createUserModel = async (data: CreateUser) => {
  return prisma.user.create({
    data,
  });
};

export const getUserByIdModel = async (id: number) => {
  return prisma.user.findUnique({
    where: { id },
    include: {
      Plan: true,
    },
  });
};

export const getAllUsersModel = async () => {
  return prisma.user.findMany({
    include: {
      Plan: true,
    },
  });
};
