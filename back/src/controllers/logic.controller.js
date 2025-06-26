"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findLogic = exports.findPlace = exports.updatePlan = void 0;
const error_1 = require("../utils/error");
const logic_service_1 = require("../service/logic.service");
const plan_model_1 = require("../models/plan.model");
const place_service_1 = require("../service/place.service");
const updatePlan = async (req, res, next) => {
    const data = req.body;
    try {
        if (!data) {
            res.status(401).json({ message: "일정의 정보가 없습니다." });
            throw new Error("일정의 정보가 없습니다.");
        }
        const result = await (0, place_service_1.updateDataLogic)(data);
        await (0, plan_model_1.updatePlanModel)(result);
        res.json(result);
    }
    catch (error) {
        (0, error_1.errorConsole)(error);
        next(new error_1.AppError(401, "일정을 수정하는데 실패했습니다.", { raw: error }));
    }
};
exports.updatePlan = updatePlan;
const findPlace = async (req, res, next) => {
    const data = req.body;
    try {
        if (!data) {
            res.status(401).json({ message: "일정의 정보가 없습니다." });
            throw new Error("일정의 정보가 없습니다.");
        }
        const result = await (0, place_service_1.findPlaceKakao)(data);
        res.json(result);
    }
    catch (error) {
        (0, error_1.errorConsole)(error);
        next(new error_1.AppError(401, "장소를 찾는데 실패했습니다.", { raw: error }));
    }
};
exports.findPlace = findPlace;
const findLogic = async (req, res, next) => {
    const data = req.body;
    try {
        if (!data) {
            res.status(401).json({ message: "일정의 정보가 없습니다." });
            throw new Error("일정의 정보가 없습니다.");
        }
        const logicResult = await (0, logic_service_1.logic)(data);
        console.log(logicResult, "reesult");
        const result = await (0, plan_model_1.createPlanModel)(logicResult);
        res.json(result);
    }
    catch (error) {
        (0, error_1.errorConsole)(error);
        next(new error_1.AppError(401, "일정을 계획하는데 실패했습니다.", { raw: error }));
    }
};
exports.findLogic = findLogic;
