"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsersModel = exports.getUserByIdModel = exports.createUserModel = exports.updateUserModel = exports.exitUserModel = exports.emailCheckModel = exports.refreshTokenModel = exports.refreshTokenCheckModel = exports.refreshTokenDeleteModel = exports.logoutModel = void 0;
const db_1 = __importDefault(require("../config/db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const logoutModel = async (logoutData) => {
    return db_1.default.user.update({
        where: { id: logoutData.id },
        data: { refreshToken: null },
    });
};
exports.logoutModel = logoutModel;
const refreshTokenDeleteModel = async (refreshToken) => {
    return db_1.default.user.updateMany({
        where: { refreshToken },
        data: { refreshToken: null },
    });
};
exports.refreshTokenDeleteModel = refreshTokenDeleteModel;
const refreshTokenCheckModel = async (refreshToken) => {
    return db_1.default.user.findFirst({
        where: { refreshToken },
    });
};
exports.refreshTokenCheckModel = refreshTokenCheckModel;
const refreshTokenModel = async (data) => {
    return db_1.default.user.update({
        where: { id: data.id },
        data: { refreshToken: data.refreshToken },
    });
};
exports.refreshTokenModel = refreshTokenModel;
const emailCheckModel = async (email) => {
    return db_1.default.user.findUnique({
        where: { email: email },
    });
};
exports.emailCheckModel = emailCheckModel;
const exitUserModel = async (data) => {
    return db_1.default.user.update({
        where: { id: data.id },
        data: { ...data },
    });
};
exports.exitUserModel = exitUserModel;
const updateUserModel = async (data) => {
    return db_1.default.user.update({
        where: { id: data.id },
        data,
    });
};
exports.updateUserModel = updateUserModel;
const createUserModel = async (data) => {
    const { password } = data;
    const hashedPassword = await bcrypt_1.default.hash(password, 12);
    data.password = hashedPassword;
    return db_1.default.user.create({
        data,
    });
};
exports.createUserModel = createUserModel;
const getUserByIdModel = async (id) => {
    return db_1.default.user.findUnique({
        where: { id },
        include: {
            Plan: true,
        },
    });
};
exports.getUserByIdModel = getUserByIdModel;
const getAllUsersModel = async (isAdmin) => {
    return db_1.default.user.findMany({
        where: isAdmin !== undefined
            ? { isAdmin, isDelete: false }
            : { isDelete: false },
        include: {
            Plan: true,
        },
    });
};
exports.getAllUsersModel = getAllUsersModel;
