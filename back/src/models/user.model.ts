import prisma from "../config/db";
import { CreateUser, ExitUser, UpdateUser } from "../types/user";
import bcrypt from "bcrypt";

export const emailCheckModel = async (email: string) => {
  return prisma.user.findUnique({
    where: { email: email },
  });
};

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
  const { password } = data;

  const hashedPassword = await bcrypt.hash(password, 12);

  data.password = hashedPassword;

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

export const getAllUsersModel = async (isAdmin: boolean) => {
  return prisma.user.findMany({
    where:
      isAdmin !== undefined
        ? { isAdmin, isDelete: false }
        : { isDelete: false },
    include: {
      Plan: true,
    },
  });
};
