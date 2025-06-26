"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPlan = exports.getPlanById = exports.getPlanUserById = exports.createPlan = exports.updatePlan = exports.deletePlan = void 0;
const error_1 = require("../utils/error");
const place_model_1 = require("../models/place.model");
const plan_model_1 = require("../models/plan.model");
const deletePlan = async (req, res, next) => {
    const planData = req.body;
    try {
        if (!planData) {
            throw new Error("일정의 정보가 없습니다.");
        }
        const data = await (0, plan_model_1.deletePlanModel)(planData);
        res.json(data);
    }
    catch (error) {
        (0, error_1.errorConsole)(error);
        next(new error_1.AppError(401, "일정을 삭제하는데 실패했습니다.", { raw: error }));
    }
};
exports.deletePlan = deletePlan;
const updatePlan = async (req, res, next) => {
    const { Place, ...planData } = req.body;
    try {
        if (Array(Place).length === 0 || !planData) {
            throw new Error("일정의 정보가 없습니다.");
        }
        const result = {
            ...planData,
            User: {
                set: Place.map((place) => place),
            },
        };
        const data = await (0, plan_model_1.updatePlanModel)(result);
        res.json(data);
    }
    catch (error) {
        (0, error_1.errorConsole)(error);
        next(new error_1.AppError(401, "일정을 수정하는데 실패했습니다.", { raw: error }));
    }
};
exports.updatePlan = updatePlan;
const createPlan = async (req, res, next) => {
    const { Place, ...planData } = req.body;
    try {
        if (Array(Place).length === 0 || !planData) {
            throw new Error("일정의 정보가 없습니다.");
        }
        const result = {
            ...planData,
            User: {
                connect: Place.map((place) => place),
            },
        };
        await (0, place_model_1.createPlaceModel)(Place);
        const data = await (0, plan_model_1.createPlanModel)(result);
        res.json(data);
    }
    catch (error) {
        (0, error_1.errorConsole)(error);
        next(new error_1.AppError(401, "일정을 생성하는데 실패했습니다.", { raw: error }));
    }
};
exports.createPlan = createPlan;
const getPlanUserById = async (req, res, next) => {
    const planData = req.body;
    try {
        if (!planData) {
            throw new Error("일정의 정보가 없습니다.");
        }
        const data = await (0, plan_model_1.getPlanUserByIdModel)(planData);
        res.json(data);
    }
    catch (error) {
        (0, error_1.errorConsole)(error);
        next(new error_1.AppError(401, "일정을 불러오는데 실패했습니다.", { raw: error }));
    }
};
exports.getPlanUserById = getPlanUserById;
const getPlanById = async (req, res, next) => {
    const planData = req.body;
    try {
        if (!planData) {
            throw new Error("일정의 정보가 없습니다.");
        }
        const data = await (0, plan_model_1.getPlanByIdModel)(planData);
        res.json(data);
    }
    catch (error) {
        (0, error_1.errorConsole)(error);
        next(new error_1.AppError(401, "일정을 불러오는데 실패했습니다.", { raw: error }));
    }
};
exports.getPlanById = getPlanById;
const getAllPlan = async (req, res, next) => {
    try {
        const data = await (0, place_model_1.getAllPlaceModel)();
        res.json(data);
    }
    catch (error) {
        (0, error_1.errorConsole)(error);
        next(new error_1.AppError(401, "일정을 불러오는데 실패했습니다.", { raw: error }));
    }
};
exports.getAllPlan = getAllPlan;
