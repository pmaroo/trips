"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCategoryModel = exports.getPlanCategoryByIdModel = exports.createCategoryModel = exports.updateCategoryModel = exports.deleteCategoryModel = void 0;
const db_1 = __importDefault(require("../config/db"));
const deleteCategoryModel = async (data) => {
    return db_1.default.category.delete({
        where: { id: data.id },
    });
};
exports.deleteCategoryModel = deleteCategoryModel;
const updateCategoryModel = async (data) => {
    return db_1.default.category.update({
        where: { id: data.id },
        data,
    });
};
exports.updateCategoryModel = updateCategoryModel;
const createCategoryModel = async (data) => {
    return db_1.default.category.create({
        data,
    });
};
exports.createCategoryModel = createCategoryModel;
const getPlanCategoryByIdModel = async (data) => {
    return db_1.default.plan.findMany({
        where: { id: data.id },
    });
};
exports.getPlanCategoryByIdModel = getPlanCategoryByIdModel;
const getAllCategoryModel = async () => {
    return db_1.default.category.findMany({
        include: {
            Tag: true,
            Plan: true,
        },
    });
};
exports.getAllCategoryModel = getAllCategoryModel;
