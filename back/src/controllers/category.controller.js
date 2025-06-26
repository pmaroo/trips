"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCategory = exports.createCategory = exports.updateCategory = exports.deleteCategory = void 0;
const error_1 = require("../utils/error");
const category_model_1 = require("../models/category.model");
const deleteCategory = async (req, res, next) => {
    const deleteData = req.body;
    try {
        if (!deleteData) {
            throw new Error("카테고리 정보가 없습니다.");
        }
        const verify = await (0, category_model_1.getPlanCategoryByIdModel)(deleteData);
        if (verify.length !== 0) {
            throw new Error("카테고리를 가지고 있는 일정이 있어 삭제가 불가합니다.");
        }
        const data = await (0, category_model_1.deleteCategoryModel)(deleteData);
        res.json(data);
    }
    catch (error) {
        (0, error_1.errorConsole)(error);
        next(new error_1.AppError(401, "카테고리를 삭제하는데 실패했습니다.", { raw: error }));
    }
};
exports.deleteCategory = deleteCategory;
const updateCategory = async (req, res, next) => {
    const { categoryData } = req.body;
    try {
        if (!categoryData) {
            throw new Error("카테고리 정보가 없습니다.");
        }
        const data = await (0, category_model_1.updateCategoryModel)(categoryData);
        res.json(data);
    }
    catch (error) {
        (0, error_1.errorConsole)(error);
        next(new error_1.AppError(401, "카테고리를 수정하는데 실패했습니다.", { raw: error }));
    }
};
exports.updateCategory = updateCategory;
const createCategory = async (req, res, next) => {
    const { categoryData } = req.body;
    try {
        if (!categoryData) {
            throw new Error("카테고리 정보가 없습니다.");
        }
        const data = await (0, category_model_1.createCategoryModel)(categoryData);
        res.json(data);
    }
    catch (error) {
        (0, error_1.errorConsole)(error);
        next(new error_1.AppError(401, "카테고리를 생성하는데 실패했습니다.", { raw: error }));
    }
};
exports.createCategory = createCategory;
const getAllCategory = async (req, res, next) => {
    try {
        const data = await (0, category_model_1.getAllCategoryModel)();
        res.json(data);
    }
    catch (error) {
        (0, error_1.errorConsole)(error);
        next(new error_1.AppError(401, "카테고리를 조회하는데 실패했습니다.", { raw: error }));
    }
};
exports.getAllCategory = getAllCategory;
